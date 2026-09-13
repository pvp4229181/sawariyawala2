import type { Metadata } from "next";
import { MenuExplorer } from "@/components/menu/menu-explorer";
import { PageHero } from "@/components/ui/page-hero";
import { seedProducts } from "@/data/seed-products";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import type { ProductDTO } from "@/types";
export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse Sawariyawala snacks, chaat, street favourites and beverages.",
};
async function products() {
  try {
    await connectDB();
    const values = await Product.find({ active: true })
      .sort({ sortOrder: 1, name: 1 })
      .lean();
    if (!values.length && (await Product.estimatedDocumentCount()) === 0)
      return seedProducts;
    return JSON.parse(JSON.stringify(values)) as ProductDTO[];
  } catch {
    return seedProducts;
  }
}
export default async function MenuPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our menu"
        title={
          <>
            Find your new
            <br />
            <em>favourite.</em>
          </>
        }
        copy="Easy-to-love Indian street food, clearly organised and ready to explore."
        image="/assets/hero-ai/menu-hero-v2.png"
      />
      <MenuExplorer products={await products()} />
    </main>
  );
}
