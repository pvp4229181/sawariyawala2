import { isAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { ContactMessage } from "@/models/ContactMessage";
export async function GET() {
  if (!(await isAdmin()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  return Response.json(
    await ContactMessage.find().sort({ createdAt: -1 }).limit(200).lean(),
  );
}
