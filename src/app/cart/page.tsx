import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/cart-page-client";
export const metadata: Metadata = { title: "Your Cart" };
export default function CartPage() {
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
