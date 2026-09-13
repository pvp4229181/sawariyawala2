import crypto from "node:crypto";
import { connectDB } from "@/lib/db";
import { createOrderNumber } from "@/lib/order-number";
import { getRazorpay } from "@/lib/razorpay";
import { checkoutSchema } from "@/lib/validators";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { siteConfig } from "@/config/site";

export async function createCheckoutOrder(input: unknown) {
  const data = checkoutSchema.parse(input);
  await connectDB();
  const slugs = data.items.map((item) => item.slug);
  const products = await Product.find({
    slug: { $in: slugs },
    active: true,
    inStock: true,
  }).lean();
  const lines = data.items.map((item) => {
    const product = products.find((value) => value.slug === item.slug);
    if (!product) throw new Error(`Product ${item.slug} is unavailable`);
    return {
      productId: product._id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      unitPrice: product.price,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity,
    };
  });
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const deliveryCharge =
    subtotal >= siteConfig.freeDeliveryThreshold
      ? 0
      : siteConfig.deliveryCharge;
  const total = subtotal + deliveryCharge;
  const orderNumber = createOrderNumber();
  const accessToken = crypto.randomBytes(24).toString("hex");
  const accessTokenHash = crypto
    .createHash("sha256")
    .update(accessToken)
    .digest("hex");
  const now = new Date();
  const order = await Order.create({
    orderNumber,
    customer: data.customer,
    address: { ...data.address, deliveryNotes: data.deliveryNotes },
    items: lines,
    subtotal,
    deliveryCharge,
    discount: 0,
    total,
    paymentMethod: data.paymentMethod,
    paymentStatus: "PENDING",
    orderStatus: data.paymentMethod === "COD" ? "CONFIRMED" : "PENDING",
    notes: data.orderNotes,
    accessTokenHash,
    timeline: [
      {
        status: data.paymentMethod === "COD" ? "CONFIRMED" : "PENDING",
        at: now,
        note:
          data.paymentMethod === "COD"
            ? "Cash on Delivery order confirmed"
            : "Waiting for online payment",
      },
    ],
  });
  if (data.paymentMethod === "COD")
    return { orderNumber, accessToken, paymentMethod: "COD" as const, total };
  const razorpayOrder = await getRazorpay().orders.create({
    amount: total * 100,
    currency: "INR",
    receipt: orderNumber,
    notes: { localOrderId: String(order._id), orderNumber },
  });
  order.razorpayOrderId = razorpayOrder.id;
  await order.save();
  return {
    orderNumber,
    accessToken,
    paymentMethod: "RAZORPAY" as const,
    total,
    razorpayOrder,
    razorpayKey:
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
  };
}
