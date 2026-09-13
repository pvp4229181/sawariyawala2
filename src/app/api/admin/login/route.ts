import { createAdminSession, verifyAdminCredentials } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";
import { rateLimit, requestKey } from "@/lib/rate-limit";
export async function POST(request: Request) {
  if (!rateLimit(`login:${requestKey(request)}`, 5, 60_000))
    return Response.json(
      { error: "Too many login attempts." },
      { status: 429 },
    );
  try {
    const data = loginSchema.parse(await request.json());
    if (!(await verifyAdminCredentials(data.email, data.password)))
      return Response.json(
        { error: "Invalid credentials or admin is not configured." },
        { status: 401 },
      );
    await createAdminSession();
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Invalid login details." }, { status: 400 });
  }
}
