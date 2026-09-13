import type { Metadata } from "next";
import { TrackOrderForm } from "@/components/orders/track-order-form";
import { PageHero } from "@/components/ui/page-hero";
export const metadata: Metadata = { title: "Track Order" };
export default function Track() {
  return (
    <main>
      <PageHero
        eyebrow="Order updates"
        title={
          <>
            Track your
            <br />
            <em>order.</em>
          </>
        }
        copy="A private lookup using both your order number and customer identifier."
        image="/assets/editorial/packaging.webp"
      />
      <section className="section shell">
        <TrackOrderForm />
      </section>
    </main>
  );
}
