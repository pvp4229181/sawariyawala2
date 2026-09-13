import { createCheckoutOrder } from "@/lib/order-service";
import { rateLimit, requestKey } from "@/lib/rate-limit";
import { safeError } from "@/lib/validators";

export async function POST(request: Request) {
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
    return Response.json(
      { error: message },
      { status: /configured|unavailable/.test(message) ? 503 : 400 },
    );
  }
}
