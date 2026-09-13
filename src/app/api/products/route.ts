import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { seedProducts } from "@/data/seed-products";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({ active: true })
      .sort({ sortOrder: 1, name: 1 })
      .lean();
    const databaseHasCatalog =
      products.length > 0 || (await Product.estimatedDocumentCount()) > 0;
    return Response.json(databaseHasCatalog ? products : seedProducts);
  } catch {
    return Response.json(seedProducts);
  }
}
