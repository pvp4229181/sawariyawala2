import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Feather, Heart, Utensils } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
export const metadata: Metadata = { title: "Our Story" };
export default function Story() {
  return (
    <main>
      <PageHero
        eyebrow="Our Story"
        title={
          <>
            Rooted in flavour.
            <br />
            <em>Designed for togetherness.</em>
          </>
        }
        copy="A modern food and hospitality identity shaped by Indian street-food culture, thoughtful service and subtle symbolic detail."
        image="/assets/hero-ai/our-story-hero-v2.png"
      />
      <section className="section shell editorial-split">
        <div>
          <span className="eyebrow">The beginning</span>
          <h2>
            A familiar feeling,
            <br />
            <em>served beautifully.</em>
          </h2>
          <p>
            Sawariyawala begins with a simple idea: good Indian food deserves an
            experience as memorable as the flavour itself. The brand brings
            together everyday street-food favourites, thoughtful presentation
            and hospitality that feels warm rather than formal.
          </p>
          <p>
            Its visual language borrows gently from the peacock feather,
            bansuri, steam and cloche - small signatures that support the food
            without overpowering it.
          </p>
        </div>
        <div className="framed-image">
          <Image
            src="/assets/editorial/hospitality.webp"
            alt="Sawariyawala hospitality concept"
            fill
            sizes="50vw"
          />
        </div>
      </section>
      <section className="navy-section section">
        <div className="shell">
          <div className="section-heading center light">
            <span className="eyebrow light">Our philosophy</span>
            <h2>
              Food first. <em>Always.</em>
            </h2>
          </div>
          <div className="philosophy-grid">
            {[
              [
                Utensils,
                "65% Food hero",
                "The dish stays at the centre of every communication.",
              ],
              [
                Heart,
                "25% Culture",
                "Indian street and city character provides warmth and context.",
              ],
              [
                Feather,
                "10% Symbolism",
                "Subtle feather and flute cues add a recognisable signature.",
              ],
            ].map(([Icon, title, copy]) => (
              <article key={String(title)}>
                <Icon />
                <h3>{String(title)}</h3>
                <p>{String(copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section shell timeline">
        <div className="section-heading">
          <span className="eyebrow">An editable journey</span>
          <h2>
            Built to <em>grow with you</em>
          </h2>
        </div>
        {[
          [
            "01",
            "Everyday favourites",
            "A clear, approachable street-food menu.",
          ],
          [
            "02",
            "Celebrations",
            "Catering and party orders with polished presentation.",
          ],
          [
            "03",
            "Hospitality",
            "A scalable brand system for larger spaces and events.",
          ],
        ].map(([n, t, c]) => (
          <div className="timeline-row" key={n}>
            <b>{n}</b>
            <h3>{t}</h3>
            <p>{c}</p>
          </div>
        ))}
      </section>
      <section className="cta-band">
        <div className="shell">
          <span className="eyebrow light">Taste the experience</span>
          <h2>
            Ready for something <em>delicious?</em>
          </h2>
          <Link href="/menu" className="button">
            Explore the Menu <ArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
