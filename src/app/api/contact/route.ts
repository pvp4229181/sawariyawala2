import { connectDB } from "@/lib/db";
import { contactSchema, safeError } from "@/lib/validators";
import { rateLimit, requestKey } from "@/lib/rate-limit";
import { ContactMessage } from "@/models/ContactMessage";

export async function POST(request: Request) {
  if (!rateLimit(`contact:${requestKey(request)}`, 5, 60_000))
    return Response.json(
      { error: "Too many messages. Please wait." },
      { status: 429 },
    );
  try {
    const data = contactSchema.parse(await request.json());
    await connectDB();
    await ContactMessage.create(data);
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    return Response.json({ error: safeError(error) }, { status: 400 });
  }
}
