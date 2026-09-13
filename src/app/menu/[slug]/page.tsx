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
            <div className="detail-heading">
              <span className="eyebrow">{p.category.replace("-", " ")}</span>
              <span className="detail-stock">
                <i /> Made fresh
              </span>
            </div>
            <h1>{p.name}</h1>
            <p className="detail-description">{p.description}</p>
            <div className="detail-meta-grid">
              <div className="detail-price">
                <small>Price</small>
                <strong>{formatMoney(p.price)}</strong>
              </div>
              <div className="detail-veg">
                <i>
                  <Leaf />
                </i>
                <span>
                  <small>Dietary</small>
                  <b>Pure vegetarian</b>
                </span>
              </div>
            </div>
            <div className="ingredients">
              <div className="ingredient-heading">
                <span>Made with care</span>
                <h3>Inside every bite</h3>
              </div>
              <div className="ingredient-list">
                {p.ingredients.map((x) => (
                  <span key={x}>
                    <Check />
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <div className="detail-actions">
              <AddButton product={p} label="Add to Cart" />
              <span>
                <b>Ready when you are</b>
                <small>Added directly to your basket</small>
              </span>
            </div>
            <p className="fine-print">
              Menu pricing is editable catalogue data and may be updated before
              launch.
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
