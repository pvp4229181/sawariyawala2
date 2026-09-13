import { z } from "zod";
import { seedProducts } from "@/data/seed-products";
import { connectDB } from "@/lib/db";
import { rateLimit, requestKey } from "@/lib/rate-limit";
import { safeError } from "@/lib/validators";
import { Review } from "@/models/Review";

const reviewSchema = z.object({
  productSlug: z.string().trim().min(1).max(100),
  customerName: z.string().trim().min(2).max(80),
  rating: z.number().int().min(1).max(5),
  review: z.string().trim().min(10).max(500),
});

export async function POST(request: Request) {
  if (!rateLimit(`review:${requestKey(request)}`, 4, 60_000))
    return Response.json(
      { error: "Too many reviews. Please wait a moment." },
      { status: 429 },
    );

  try {
    const data = reviewSchema.parse(await request.json());
    const product = seedProducts.find((item) => item.slug === data.productSlug);

    if (!product)
      return Response.json({ error: "Menu item not found." }, { status: 404 });

    await connectDB();
    await Review.create({
      ...data,
      productName: product.name,
      status: "PENDING",
    });

    return Response.json(
      { message: "Thank you! Your review has been sent for approval." },
      { status: 201 },
    );
  } catch (error) {
    return Response.json({ error: safeError(error) }, { status: 400 });
  }
}
