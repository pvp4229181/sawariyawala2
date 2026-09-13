import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/checkout-client";
export const metadata: Metadata = { title: "Secure Checkout" };
export default function Checkout() {
  return (
    <main className="checkout-page shell">
      <div className="section-heading">
        <span className="eyebrow">Secure checkout</span>
        <h1>
          Complete your <em>order.</em>
        </h1>
      </div>
      <CheckoutClient />
    </main>
  );
}
