import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CartPageClient } from "@/components/cart/cart-page-client";
import { CART_ENABLED } from "@/config/features";
export const metadata: Metadata = { title: "Your Cart" };
export default function CartPage() {
  if (!CART_ENABLED) notFound();

  return (
    <main className="simple-page shell">
      <div className="section-heading">
        <span className="eyebrow">Your order</span>
        <h1>Cart</h1>
      </div>
      <CartPageClient />
    </main>
  );
}
