import { connectDB } from "@/lib/db";
import { CHECKOUT_ENABLED } from "@/config/features";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { Order } from "@/models/Order";

export async function POST(request: Request) {
  if (!CHECKOUT_ENABLED)
    return Response.json({ ok: true, commerceDisabled: true });

  const raw = await request.text(),
    signature = request.headers.get("x-razorpay-signature") || "";
  if (!verifyWebhookSignature(raw, signature))
    return Response.json(
      { error: "Invalid webhook signature." },
      { status: 401 },
    );
  try {
    const event = JSON.parse(raw),
      eventId =
        request.headers.get("x-razorpay-event-id") ||
        `${event.event}:${event.created_at}`;
    const payment = event.payload?.payment?.entity,
      razorpayOrderId = payment?.order_id;
    if (!razorpayOrderId) return Response.json({ ok: true });
    await connectDB();
    const order = await Order.findOne({ razorpayOrderId });
    if (!order || order.processedWebhookEvents.includes(eventId))
      return Response.json({ ok: true });
    if (event.event === "payment.captured") {
      order.paymentStatus = "PAID";
      order.orderStatus = "CONFIRMED";
      order.razorpayPaymentId = payment.id;
      order.timeline.push({
        status: "CONFIRMED",
        at: new Date(),
        note: "Payment reconciled by Razorpay webhook",
      });
    }
    if (event.event === "payment.failed" && order.paymentStatus !== "PAID")
      order.paymentStatus = "FAILED";
    order.processedWebhookEvents.push(eventId);
    await order.save();
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Webhook processing failed." },
      { status: 400 },
    );
  }
}
