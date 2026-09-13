import crypto from "node:crypto";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderNumber: string }> },
) {
  const { orderNumber } = await params,
    token = new URL(request.url).searchParams.get("token") || "";
  if (!token)
    return Response.json({ error: "Access token required." }, { status: 401 });
  await connectDB();
  const order = await Order.findOne({ orderNumber }).lean();
  if (!order)
    return Response.json({ error: "Order not found." }, { status: 404 });
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  if (hash !== order.accessTokenHash)
    return Response.json({ error: "Invalid access token." }, { status: 403 });
  const {
    accessTokenHash: _private,
    processedWebhookEvents: _events,
    razorpaySignature: _signature,
    ...safe
  } = order;
  void _private;
  void _events;
  void _signature;
  return Response.json(safe);
}
