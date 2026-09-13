import type { Metadata } from "next";
import Image from "next/image";
import { CateringForm } from "@/components/forms/catering-form";
import { PageHero } from "@/components/ui/page-hero";
export const metadata: Metadata = { title: "Catering" };
export default function Catering() {
  return (
    <main>
      <PageHero
        eyebrow="Food for every gathering"
        title={
          <>
            Catering made
            <br />
            <em>memorable.</em>
          </>
        }
        copy="From intimate celebrations to corporate counters, create an Indian food experience that feels unmistakably yours."
        image="/assets/editorial/hospitality.webp"
      />
      <section className="section shell editorial-split">
        <div>
          <span className="eyebrow">Party orders & events</span>
          <h2>
            Tell us what you are
            <br />
            <em>celebrating.</em>
          </h2>
          <p>
            Share your occasion, date and guest count. Our team will use those
            details to discuss a suitable menu and service format.
          </p>
          <div className="framed-image short">
            <Image
              src="/assets/editorial/packaging.webp"
              alt="Premium Sawariyawala catering packaging"
              fill
              sizes="50vw"
            />
          </div>
        </div>
        <CateringForm />
      </section>
    </main>
  );
}
