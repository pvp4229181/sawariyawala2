import { createCheckoutOrder } from "@/lib/order-service";
import { COMMERCE_ENABLED, COMMERCE_PAUSED_MESSAGE } from "@/config/features";
import { rateLimit, requestKey } from "@/lib/rate-limit";
import { safeError } from "@/lib/validators";

export async function POST(request: Request) {
  if (!COMMERCE_ENABLED)
    return Response.json({ error: COMMERCE_PAUSED_MESSAGE }, { status: 503 });

  if (!rateLimit(`checkout:${requestKey(request)}`, 8, 60_000))
    return Response.json(
      { error: "Too many checkout attempts. Please wait a moment." },
      { status: 429 },
    );
  try {
    return Response.json(await createCheckoutOrder(await request.json()), {
      status: 201,
    });
  } catch (error) {
    const message = safeError(error);
    const status = message.includes(" is unavailable")
      ? 409
      : message.includes("is not configured")
        ? 503
        : 400;
    return Response.json({ error: message }, { status });
  }
}
