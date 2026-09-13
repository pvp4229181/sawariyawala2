import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Leaf, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { AddButton } from "@/components/menu/add-button";
import { COMMERCE_ENABLED } from "@/config/features";
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
  const reviews = [
    {
      name: "Meera S.",
      initials: "MS",
      quote: `The ${p.name} arrived warm, fresh and beautifully packed. The flavour felt homemade without being heavy.`,
    },
    {
      name: "Aarav P.",
      initials: "AP",
      quote: `A lovely balance of texture and spice. ${p.name} has become an easy repeat order for our family evenings.`,
    },
    {
      name: "Nisha R.",
      initials: "NR",
      quote:
        "Thoughtful presentation, generous portions and a smooth experience from start to finish.",
    },
  ];
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
                <b>
                  {COMMERCE_ENABLED
                    ? "Ready when you are"
                    : "Online ordering paused"}
                </b>
                <small>
                  {COMMERCE_ENABLED
                    ? "Added directly to your basket"
                    : "Returning in a future update"}
                </small>
              </span>
            </div>
            <p className="fine-print">
              Menu pricing is editable catalogue data and may be updated before
              launch.
            </p>
          </div>
        </div>
      </section>
      <section className="section product-reviews-section">
        <div className="shell">
          <div className="product-reviews-head">
            <div>
              <span className="eyebrow">Customer reviews</span>
              <h2>
                Small bites. <em>Big smiles.</em>
              </h2>
              <p>
                A taste of what customers enjoy about {p.name}, from the first
                bite to the last.
              </p>
            </div>
            <div className="review-score" aria-label="Rated 4.8 out of 5">
              <strong>4.8</strong>
              <div aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} />
                ))}
              </div>
              <small>Demo customer feedback</small>
            </div>
          </div>
          <div className="product-review-grid">
            {reviews.map((review) => (
              <article className="product-review-card" key={review.name}>
                <div className="review-card-top">
                  <span>{review.initials}</span>
                  <div>
                    <b>{review.name}</b>
                    <small>Customer note</small>
                  </div>
                </div>
                <div className="review-stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} aria-hidden="true" />
                  ))}
                </div>
                <blockquote>“{review.quote}”</blockquote>
                <footer>
                  <Check aria-hidden="true" /> Demo review for {p.name}
                </footer>
              </article>
            ))}
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
