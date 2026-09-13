"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { formatMoney } from "@/lib/money";
import { useCart } from "@/store/cart-store";
export function CartPageClient() {
  const { items, setQuantity, remove, clear } = useCart(),
    [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="cart-skeleton" />;
  const subtotal = items.reduce((s, x) => s + x.price * x.quantity, 0),
    fee =
      subtotal >= siteConfig.freeDeliveryThreshold
        ? 0
        : siteConfig.deliveryCharge;
  if (!items.length)
    return (
      <div className="empty-state page-empty">
        <ShoppingBag />
        <h2>Your cart is empty</h2>
        <p>There is plenty worth tasting.</p>
        <Link className="button" href="/menu">
          Explore Menu
        </Link>
      </div>
    );
  return (
    <div className="cart-page-grid">
      <section className="cart-page-lines">
        <div className="cart-table-head">
          <span>Item</span>
          <span>Quantity</span>
          <span>Total</span>
        </div>
        {items.map((line) => (
          <article key={line.slug}>
            <Image src={line.image} alt={line.name} width={132} height={132} />
            <div className="cart-name">
              <Link href={`/menu/${line.slug}`}>{line.name}</Link>
              <small>{formatMoney(line.price)} each</small>
              <button onClick={() => remove(line.slug)}>
                <Trash2 />
                Remove
              </button>
            </div>
            <div className="quantity large">
              <button onClick={() => setQuantity(line.slug, line.quantity - 1)}>
                <Minus />
              </button>
              <b>{line.quantity}</b>
              <button onClick={() => setQuantity(line.slug, line.quantity + 1)}>
                <Plus />
              </button>
            </div>
            <strong>{formatMoney(line.price * line.quantity)}</strong>
          </article>
        ))}
        <button className="clear-link" onClick={clear}>
          Clear cart
        </button>
      </section>
      <aside className="order-card">
        <span className="eyebrow">Order summary</span>
        <h2>Your total</h2>
        <div>
          <span>Subtotal</span>
          <b>{formatMoney(subtotal)}</b>
        </div>
        <div>
          <span>Delivery</span>
          <b>{fee ? formatMoney(fee) : "FREE"}</b>
        </div>
        <hr />
        <div className="grand-total">
          <span>Total</span>
          <b>{formatMoney(subtotal + fee)}</b>
        </div>
        <p>
          {fee
            ? `Free delivery above ${formatMoney(siteConfig.freeDeliveryThreshold)}.`
            : "Your order qualifies for free delivery."}
        </p>
        <Link className="button full" href="/checkout">
          Proceed to Checkout <ArrowRight />
        </Link>
      </aside>
    </div>
  );
}
