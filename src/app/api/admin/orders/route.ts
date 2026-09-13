import { isAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
export async function GET(request: Request) {
  if (!(await isAdmin()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const url = new URL(request.url),
    status = url.searchParams.get("status");
  const query = status ? { orderStatus: status } : {};
  return Response.json(
    await Order.find(query).sort({ createdAt: -1 }).limit(200).lean(),
  );
}
