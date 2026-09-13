import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Leaf } from "lucide-react";
import { notFound } from "next/navigation";
import { AddButton } from "@/components/menu/add-button";
import { ProductCard } from "@/components/menu/product-card";
import { seedProducts } from "@/data/seed-products";
import { formatMoney } from "@/lib/money";

export async function generateStaticParams() {
  return seedProducts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params,
    p = seedProducts.find((x) => x.slug === slug);
  return { title: p?.name || "Menu item", description: p?.shortDescription };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    p = seedProducts.find((x) => x.slug === slug);
  if (!p) notFound();
  const related = seedProducts
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 3);
  return (
    <main>
      <section className="product-detail shell">
        <Link href="/menu" className="back-link">
          <ArrowLeft />
          Back to menu
        </Link>
        <div className="product-detail-grid">
          <div className="detail-image">
            <Image
              src={p.image}
              alt={p.name}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            {p.badges[0] && <span>{p.badges[0]}</span>}
          </div>
          <div className="detail-copy">
            <span className="eyebrow">{p.category.replace("-", " ")}</span>
            <h1>{p.name}</h1>
            <div className="detail-meta">
              <b>{formatMoney(p.price)}</b>
              <span>
                <Leaf />
                Pure vegetarian
              </span>
            </div>
            <p className="lead">{p.description}</p>
            <div className="ingredients">
              <h3>What goes into it</h3>
              {p.ingredients.map((x) => (
                <span key={x}>
                  <Check />
                  {x}
                </span>
              ))}
            </div>
            <AddButton product={p} label="Add to Cart" />
            <p className="fine-print">
              Pricing is editable demo catalogue data sourced from the supplied
              brand lookbook.
            </p>
          </div>
        </div>
      </section>
      <section className="section cream-section">
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow">You may also like</span>
            <h2>
              More from the <em>menu</em>
            </h2>
          </div>
          <div className="product-grid related">
            {related.map((x) => (
              <ProductCard key={x.slug} product={x} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
