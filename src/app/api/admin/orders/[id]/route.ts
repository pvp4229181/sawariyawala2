import { isAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { statusSchema } from "@/lib/validators";
import { Order } from "@/models/Order";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await connectDB();
  const order = await Order.findById(id).lean();
  return order
    ? Response.json(order)
    : Response.json({ error: "Order not found" }, { status: 404 });
}
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { orderStatus } = statusSchema.parse(await request.json()),
      { id } = await params;
    await connectDB();
    const order = await Order.findById(id);
    if (!order)
      return Response.json({ error: "Order not found" }, { status: 404 });
    if (order.orderStatus !== orderStatus) {
      order.orderStatus = orderStatus;
      order.timeline.push({
        status: orderStatus,
        at: new Date(),
        note: "Status updated by admin",
      });
      await order.save();
    }
    return Response.json(order);
  } catch {
    return Response.json({ error: "Invalid status update" }, { status: 400 });
  }
}
