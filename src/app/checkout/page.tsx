import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutClient } from "@/components/checkout/checkout-client";
import { COMMERCE_ENABLED } from "@/config/features";
export const metadata: Metadata = { title: "Secure Checkout" };
export default function Checkout() {
  if (!COMMERCE_ENABLED) notFound();

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
