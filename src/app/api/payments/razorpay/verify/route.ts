import { z } from "zod";
import { connectDB } from "@/lib/db";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { rateLimit, requestKey } from "@/lib/rate-limit";
import { Order } from "@/models/Order";

const schema = z.object({
  orderNumber: z.string().max(40),
  razorpay_order_id: z.string().max(100),
  razorpay_payment_id: z.string().max(100),
  razorpay_signature: z.string().length(64),
});
export async function POST(request: Request) {
  if (!rateLimit(`payment:${requestKey(request)}`, 10, 60_000))
    return Response.json({ error: "Too many attempts." }, { status: 429 });
  try {
    const data = schema.parse(await request.json());
    await connectDB();
    const order = await Order.findOne({
      orderNumber: data.orderNumber,
      razorpayOrderId: data.razorpay_order_id,
    });
    if (!order)
      return Response.json({ error: "Order not found." }, { status: 404 });
    if (
      !verifyPaymentSignature(
        data.razorpay_order_id,
        data.razorpay_payment_id,
        data.razorpay_signature,
      )
    ) {
      order.paymentStatus = "FAILED";
      await order.save();
      return Response.json(
        { error: "Payment verification failed." },
        { status: 400 },
      );
    }
    if (order.paymentStatus !== "PAID") {
      order.paymentStatus = "PAID";
      order.orderStatus = "CONFIRMED";
      order.razorpayPaymentId = data.razorpay_payment_id;
      order.razorpaySignature = data.razorpay_signature;
      order.timeline.push({
        status: "CONFIRMED",
        at: new Date(),
        note: "Online payment verified",
      });
      await order.save();
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Invalid payment response." },
      { status: 400 },
    );
  }
}
