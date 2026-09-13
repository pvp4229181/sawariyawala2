"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { ProductDTO } from "@/types";
export function ProductManager() {
  const [items, setItems] = useState<ProductDTO[]>([]),
    [loading, setLoading] = useState(true),
    [creating, setCreating] = useState(false);
  async function load() {
    const r = await fetch("/api/admin/products"),
      d = await r.json();
    setItems(d);
    setLoading(false);
  }
  useEffect(() => {
    void load();
  }, []);
  async function update(slug: string, patch: Partial<ProductDTO>) {
    const r = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, ...patch }),
    });
    if (!r.ok) return toast.error("Could not update product");
    setItems((old) =>
      old.map((x) => (x.slug === slug ? { ...x, ...patch } : x)),
    );
    toast.success("Product updated");
  }
  async function createProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        slug: form.get("slug"),
        category: form.get("category"),
        price: Number(form.get("price")),
        shortDescription: form.get("shortDescription"),
      }),
    });
    const result = await response.json();
    if (!response.ok) return toast.error(result.error);
    setItems((current) => [...current, result]);
    setCreating(false);
    toast.success("Product created");
  }
  if (loading) return <p>Loading products...</p>;
  return (
    <>
      <button
        className="button button-small admin-create"
        onClick={() => setCreating(!creating)}
      >
        {creating ? "Cancel" : "Create product"}
      </button>
      {creating && (
        <form className="admin-create-form" onSubmit={createProduct}>
          <input required name="name" placeholder="Product name" />
          <input
            required
            name="slug"
            pattern="[a-z0-9-]+"
            placeholder="product-slug"
          />
          <select name="category">
            <option value="snacks">Snacks</option>
            <option value="chaat">Chaat</option>
            <option value="street-favourites">Street Favourites</option>
            <option value="beverages">Beverages</option>
          </select>
          <input
            required
            name="price"
            type="number"
            min="0"
            placeholder="Price"
          />
          <input
            required
            name="shortDescription"
            placeholder="Short description"
          />
          <button className="button button-small">Save product</button>
        </form>
      )}
      <div className="admin-table">
        <div className="admin-row header">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Flags</span>
          <span>Active</span>
        </div>
        {items.map((item) => (
          <div className="admin-row" key={item.slug}>
            <b>{item.name}</b>
            <span>{item.category}</span>
            <label className="price-edit">
              Rs.
              <input
                defaultValue={item.price}
                type="number"
                min="0"
                onBlur={(e) => {
                  const price = Number(e.target.value);
                  if (price !== item.price) void update(item.slug, { price });
                }}
              />
            </label>
            <span className="flag-buttons">
              <button
                className={item.featured ? "on" : ""}
                onClick={() => update(item.slug, { featured: !item.featured })}
              >
                Featured
              </button>
              <button
                className={item.bestseller ? "on" : ""}
                onClick={() =>
                  update(item.slug, { bestseller: !item.bestseller })
                }
              >
                Best
              </button>
            </span>
            <button
              className={`status-pill ${item.active ? "active" : ""}`}
              onClick={() => update(item.slug, { active: !item.active })}
            >
              {item.active ? "Active" : "Hidden"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
