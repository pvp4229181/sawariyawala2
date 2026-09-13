import { z } from "zod";
import { isAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
const patch = z.object({
  slug: z.string().min(1),
  price: z.number().min(0).optional(),
  active: z.boolean().optional(),
  featured: z.boolean().optional(),
  bestseller: z.boolean().optional(),
  inStock: z.boolean().optional(),
});
const create = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/),
  category: z.enum(["snacks", "chaat", "street-favourites", "beverages"]),
  price: z.number().min(0),
  shortDescription: z.string().trim().min(3).max(180),
});
export async function GET() {
  if (!(await isAdmin()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  return Response.json(
    await Product.find().sort({ category: 1, sortOrder: 1 }).lean(),
  );
}
export async function PATCH(request: Request) {
  if (!(await isAdmin()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { slug, ...update } = patch.parse(await request.json());
    await connectDB();
    const product = await Product.findOneAndUpdate(
      { slug },
      { $set: update },
      { new: true },
    ).lean();
    return product
      ? Response.json(product)
      : Response.json({ error: "Product not found" }, { status: 404 });
  } catch {
    return Response.json({ error: "Invalid update" }, { status: 400 });
  }
}
export async function POST(request: Request) {
  if (!(await isAdmin()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = create.parse(await request.json());
    await connectDB();
    const product = await Product.create({
      ...data,
      description: data.shortDescription,
      image: "/assets/food/samosa.webp",
      gallery: [],
      ingredients: [],
      tags: ["vegetarian"],
      badges: [],
      vegetarian: true,
      featured: false,
      bestseller: false,
      inStock: true,
      sortOrder: 99,
      active: true,
    });
    return Response.json(product, { status: 201 });
  } catch (error) {
    const duplicate =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000;
    return Response.json(
      {
        error: duplicate
          ? "That slug already exists."
          : "Invalid product details.",
      },
      { status: 400 },
    );
  }
}
