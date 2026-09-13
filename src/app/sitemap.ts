import type { MetadataRoute } from "next";
import { seedProducts } from "@/data/seed-products";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const pages = [
    "",
    "/menu",
    "/our-story",
    "/why-us",
    "/catering",
    "/contact",
    "/cart",
    "/track-order",
  ];
  return [
    ...pages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...seedProducts.map((product) => ({
      url: `${base}/menu/${product.slug}`,
      lastModified: new Date(),
    })),
  ];
}
