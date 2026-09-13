"use client";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { ProductDTO } from "@/types";
import { ProductCard } from "./product-card";

const filters = [
  ["all", "All"],
  ["snacks", "Snacks"],
  ["chaat", "Chaat"],
  ["street-favourites", "Street Favourites"],
  ["beverages", "Beverages"],
];
export function MenuExplorer({ products }: { products: ProductDTO[] }) {
  const [category, setCategory] = useState("all"),
    [query, setQuery] = useState("");
  const shown = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "all" || p.category === category) &&
          `${p.name} ${p.shortDescription}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [products, category, query],
  );
  return (
    <section className="section shell menu-explorer">
      <div className="menu-tools">
        <div className="filter-row">
          <SlidersHorizontal />
          {filters.map(([value, label]) => (
            <button
              className={category === value ? "active" : ""}
              onClick={() => setCategory(value)}
              key={value}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="search-box">
          <Search />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search">
              <X />
            </button>
          )}
        </label>
      </div>
      <div className="menu-count">{shown.length} dishes</div>
      {shown.length ? (
        <div className="product-grid menu-products">
          {shown.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state menu-empty">
          <Search size={48} />
          <h2>No dishes found</h2>
          <p>Try another category or search term.</p>
        </div>
      )}
    </section>
  );
}
