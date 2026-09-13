import { connectDB } from "@/lib/db";
import { trackSchema, safeError } from "@/lib/validators";
import { rateLimit, requestKey } from "@/lib/rate-limit";
import { Order } from "@/models/Order";

export async function POST(request: Request) {
  if (!rateLimit(`track:${requestKey(request)}`, 12, 60_000))
    return Response.json(
      { error: "Too many lookups. Please wait." },
      { status: 429 },
    );
  try {
    const { orderNumber, identifier } = trackSchema.parse(await request.json());
    await connectDB();
    const normalized = identifier.trim().toLowerCase();
    const order = await Order.findOne({
      orderNumber,
      $or: [
        { "customer.phone": normalized.replace(/\D/g, "").slice(-10) },
        { "customer.email": normalized },
      ],
    }).lean();
    if (!order)
      return Response.json(
        { error: "No matching order found." },
        { status: 404 },
      );
    return Response.json({
      orderNumber: order.orderNumber,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      total: order.total,
      timeline: order.timeline,
      createdAt: order.createdAt,
    });
  } catch (error) {
    return Response.json({ error: safeError(error) }, { status: 400 });
  }
}
