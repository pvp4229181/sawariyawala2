import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { seedProducts } from "@/data/seed-products";

export async function GET() {
  try {
    await connectDB();
    return Response.json(
      await Product.find({ active: true })
        .sort({ sortOrder: 1, name: 1 })
        .lean(),
    );
  } catch {
    return Response.json(seedProducts);
  }
}
