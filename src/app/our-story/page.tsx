import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Feather,
  Heart,
  PartyPopper,
  Sparkles,
  Store,
  Utensils,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
export const metadata: Metadata = { title: "Our Story" };

const journey = [
  {
    number: "01",
    label: "The everyday",
    title: "Everyday favourites",
    copy: "A focused street-food menu made for quick cravings, familiar comfort and easy ordering.",
    icon: Utensils,
  },
  {
    number: "02",
    label: "The occasion",
    title: "Celebrations",
    copy: "Catering and party orders shaped around gatherings, thoughtful service and polished presentation.",
    icon: PartyPopper,
  },
  {
    number: "03",
    label: "The experience",
    title: "Hospitality",
    copy: "A warm, scalable food experience designed for larger spaces, counters and memorable events.",
    icon: Store,
  },
];

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
      <section className="section journey-section" id="journey">
        <div className="shell timeline">
          <div className="timeline-intro">
            <span className="eyebrow">An evolving journey</span>
            <h2>
              Made for today.
              <br />
              Built to <em>grow with you.</em>
            </h2>
            <p>
              From an everyday craving to a room full of guests, each chapter
              keeps the food familiar and the experience thoughtfully made.
            </p>
            <div className="timeline-note">
              <Sparkles />
              <span>One food-first idea, designed to scale beautifully.</span>
            </div>
          </div>
          <div className="timeline-list">
            {journey.map(({ number, label, title, copy, icon: Icon }) => (
              <article className="timeline-card" key={number}>
                <div className="timeline-icon">
                  <Icon />
                </div>
                <div className="timeline-content">
                  <span>{label}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <b aria-hidden="true">{number}</b>
              </article>
            ))}
          </div>
        </div>
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
