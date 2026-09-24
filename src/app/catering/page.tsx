import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { CateringForm } from "@/components/forms/catering-form";
import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/config/site";
import {
  cateringFormats,
  cateringInclusions,
  cateringOccasions,
  cateringProcess,
  cateringScales,
  cateringServices,
} from "@/data/catering-services";

export const metadata: Metadata = {
  title: "Catering Services",
  description:
    "Wedding, corporate, festival and house-party catering from Sawariyawala: live chaat counters, buffet service, packed thalis and bulk party orders.",
};

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
        image="/assets/hero-ai/catering-hero-editorial.webp"
      />

      <section className="section shell">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">What we cater</span>
            <h2>
              Services built around
              <br />
              <em>your occasion.</em>
            </h2>
          </div>
          <p>
            Every event gets its own menu, service format and staffing plan.
            Pick the service closest to what you are hosting, and we will shape
            the rest around your date, venue and guest count.
          </p>
        </div>
        <div className="service-grid">
          {cateringServices.map(
            ({ slug, icon: Icon, title, copy, highlights }) => (
              <article className="service-card" key={slug}>
                <i aria-hidden="true">
                  <Icon />
                </i>
                <h3>{title}</h3>
                <p>{copy}</p>
                <ul>
                  {highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ),
          )}
        </div>
      </section>

      <section className="section navy-section">
        <div className="shell">
          <div className="section-heading center light">
            <span className="eyebrow light">How the food is served</span>
            <h2>
              Choose your <em>service format.</em>
            </h2>
          </div>
          <div className="philosophy-grid four">
            {cateringFormats.map(({ icon: Icon, title, copy }) => (
              <article key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell editorial-split reverse">
        <div className="framed-image">
          <Image
            src="/assets/editorial/packaging.webp"
            alt="Sawariyawala catering packaging and counter presentation"
            fill
            sizes="50vw"
          />
        </div>
        <div>
          <span className="eyebrow">What is included</span>
          <h2>
            We handle the counter,
            <br />
            <em>you host the room.</em>
          </h2>
          <ul className="check-list">
            {cateringInclusions.map((item) => (
              <li key={item}>
                <Check />
                {item}
              </li>
            ))}
          </ul>
          <a className="button" href={`tel:${siteConfig.phone}`}>
            <Phone /> Talk to our catering team
          </a>
        </div>
      </section>

      <section className="section cream-section">
        <div className="shell">
          <div className="section-heading center">
            <span className="eyebrow">Any guest count</span>
            <h2>
              Small kitchens to
              <br />
              <em>full halls.</em>
            </h2>
          </div>
          <div className="scale-grid">
            {cateringScales.map(({ guests, title, copy }) => (
              <article key={title}>
                <span>{guests} guests</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="occasion-cloud">
            <span className="eyebrow">Occasions we cater</span>
            <ul>
              {cateringOccasions.map((occasion) => (
                <li key={occasion}>{occasion}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading center">
          <span className="eyebrow">How booking works</span>
          <h2>
            Four steps from enquiry
            <br />
            to <em>service.</em>
          </h2>
        </div>
        <div className="catering-steps">
          {cateringProcess.map(({ number, label, title, copy }) => (
            <article key={number}>
              <b aria-hidden="true">{number}</b>
              <span>{label}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cream-section" id="enquiry">
        <div className="shell editorial-split">
          <div>
            <span className="eyebrow">Party orders & events</span>
            <h2>
              Tell us what you are
              <br />
              <em>celebrating.</em>
            </h2>
            <p>
              Share your occasion, date and guest count. Our team will use those
              details to discuss a suitable menu and service format, then send a
              written quote before anything is confirmed.
            </p>
            <div className="framed-image short">
              <Image
                src="/assets/editorial/hospitality.webp"
                alt="Sawariyawala catering service in progress"
                fill
                sizes="50vw"
              />
            </div>
          </div>
          <CateringForm />
        </div>
      </section>

      <section className="cta-band">
        <div className="shell">
          <span className="eyebrow light">Start with the food</span>
          <h2>
            See what we <em>cook.</em>
          </h2>
          <Link href="/menu" className="button">
            Explore the Menu <ArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
