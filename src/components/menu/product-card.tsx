"use client";
import Image from "next/image";
import Link from "next/link";
import { Eye, Leaf, Star, X } from "lucide-react";
import { useState } from "react";
import type { ProductDTO } from "@/types";
import { formatMoney } from "@/lib/money";
import { AddButton } from "./add-button";

export function ProductCard({ product }: { product: ProductDTO }) {
  const [quick, setQuick] = useState(false);
  return (
    <>
      <article className="product-card">
        <Link className="product-image" href={`/menu/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 280px"
          />
          <div className="product-badges">
            <span className="veg">
              <Leaf />
              Veg
            </span>
            {product.badges[0] && <span>{product.badges[0]}</span>}
          </div>
        </Link>
        <button className="quick-button" onClick={() => setQuick(true)}>
          <Eye /> Quick view
        </button>
        <div className="product-copy">
          <div className="rating">
            <Star fill="currentColor" />
            4.8
          </div>
          <Link href={`/menu/${product.slug}`}>
            <h3>{product.name}</h3>
          </Link>
          <p>{product.shortDescription}</p>
          <div className="product-bottom">
            <b>{formatMoney(product.price)}</b>
            <AddButton product={product} />
          </div>
        </div>
      </article>
      {quick && (
        <div
          className="quick-layer"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setQuick(false)
          }
        >
          <section className="quick-modal">
            <button
              className="quick-close"
              onClick={() => setQuick(false)}
              aria-label="Close quick view"
            >
              <X />
            </button>
            <div className="quick-image">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="500px"
              />
            </div>
            <div className="quick-copy">
              <span className="eyebrow">
                {product.category.replace("-", " ")}
              </span>
              <h2>{product.name}</h2>
              <b className="quick-price">{formatMoney(product.price)}</b>
              <p>{product.description}</p>
              <div className="quick-tags">
                {product.ingredients.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <AddButton product={product} label="Add to Cart" />
              <Link
                href={`/menu/${product.slug}`}
                className="text-link"
                onClick={() => setQuick(false)}
              >
                View full details
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
