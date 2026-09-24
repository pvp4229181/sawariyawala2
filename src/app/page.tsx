import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  HeartHandshake,
  Leaf,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  cateringFormats,
  cateringProcess,
  cateringScales,
} from "@/data/catering-services";

const occasions = [
  {
    number: "01",
    title: "Weddings & family celebrations",
    copy: "From mehendi evenings to milestone birthdays, we plan the menu and service around the mood of your occasion.",
  },
  {
    number: "02",
    title: "Corporate & community events",
    copy: "Reliable timing, smart presentation and flexible formats for offices, societies, festivals and large gatherings.",
  },
  {
    number: "03",
    title: "Intimate gatherings",
    copy: "Thoughtful catering for poojas, housewarmings and private parties, without the stress of managing service yourself.",
  },
];

const servicePromises = [
  "Pure vegetarian kitchen",
  "Jain and no-onion-no-garlic options",
  "Setup, serving and pack-down support",
];

export default function Home() {
  return (
    <main className="catering-home">
      <section className="catering-home-hero">
        <video
          className="catering-home-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/editorial/hospitality.webp"
          aria-hidden="true"
        >
          <source
            src="/assets/video/catering-staff-hero-clean.mp4"
            type="video/mp4"
          />
        </video>
        <div className="catering-home-hero-shade" />
        <div className="shell catering-home-hero-copy">
          <span className="eyebrow light">Catering for every gathering</span>
          <h1>
            You celebrate.{" "}
            <em>We take care of the rest.</em>
          </h1>
          <p>
            Warm Indian hospitality for weddings, office events, poojas and
            private celebrations—with menus, counters and service shaped around
            your guests.
          </p>
          <div className="hero-actions">
            <Link href="/catering#enquiry" className="button">
              Plan Your Event <ArrowRight aria-hidden="true" />
            </Link>
            <a className="button ghost" href={`tel:${siteConfig.phone}`}>
              <Phone aria-hidden="true" /> Talk to Our Team
            </a>
          </div>
          <div className="catering-home-hero-notes">
            <span>
              <Users aria-hidden="true" /> 20 to 500+ guests
            </span>
            <span>
              <Leaf aria-hidden="true" /> Pure vegetarian
            </span>
            <span>
              <HeartHandshake aria-hidden="true" /> Complete event support
            </span>
          </div>
        </div>
      </section>

      <section className="section shell catering-home-intro">
        <div className="catering-home-intro-copy">
          <span className="eyebrow">Hospitality, handled</span>
          <h2>
            A celebration should feel
            <br />
            <em>effortless to host.</em>
          </h2>
          <p>
            Tell us your date, venue, guest count and occasion. We will help
            shape the right service format, coordinate the details and keep the
            experience moving smoothly from setup to the final serving.
          </p>
          <ul className="catering-home-checks">
            {servicePromises.map((promise) => (
              <li key={promise}>
                <Check aria-hidden="true" /> {promise}
              </li>
            ))}
          </ul>
          <Link href="/catering" className="text-link">
            Explore catering services <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="catering-home-intro-visual">
          <div className="catering-home-image">
            <Image
              src="/assets/editorial/packaging.webp"
              alt="Elegant Sawariyawala catering setup and packaging"
              fill
              sizes="(max-width: 800px) 100vw, 48vw"
            />
          </div>
          <div className="catering-home-quote">
            <Sparkles aria-hidden="true" />
            <p>Planned around your occasion, not pulled from a template.</p>
          </div>
        </div>
      </section>

      <section className="section catering-home-occasions">
        <div className="shell">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">Made for your moment</span>
              <h2>
                Every kind of gathering,
                <br />
                <em>thoughtfully served.</em>
              </h2>
            </div>
            <p>
              Big hall or family home, formal run sheet or relaxed evening—we
              adapt the service to the way you want to host.
            </p>
          </div>
          <div className="catering-home-occasion-grid">
            {occasions.map(({ number, title, copy }) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading center">
          <span className="eyebrow">Choose how we serve</span>
          <h2>
            The right format for
            <br />
            <em>your space and schedule.</em>
          </h2>
        </div>
        <div className="catering-home-format-grid">
          {cateringFormats.map(({ icon: Icon, title, copy }) => (
            <article key={title}>
              <i aria-hidden="true">
                <Icon />
              </i>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section catering-home-scale">
        <div className="shell">
          <div className="catering-home-scale-heading">
            <div>
              <span className="eyebrow light">From close-knit to grand</span>
              <h2>
                Your guest list can grow.
                <br />
                <em>Our care stays personal.</em>
              </h2>
            </div>
            <p>
              We scale the kitchen plan, team and setup to suit your headcount
              while keeping one clear point of contact throughout.
            </p>
          </div>
          <div className="catering-home-scale-grid">
            {cateringScales.map(({ guests, title, copy }) => (
              <article key={title}>
                <strong>{guests}</strong>
                <span>guests</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell catering-home-process">
        <div className="section-heading center">
          <span className="eyebrow">Simple from the start</span>
          <h2>
            Four steps to a
            <br />
            <em>well-served celebration.</em>
          </h2>
        </div>
        <div className="catering-home-process-grid">
          {cateringProcess.map(({ number, title, copy }) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell catering-home-menu-bridge">
        <div>
          <span className="eyebrow">Looking for individual dishes?</span>
          <h2>
            Our food lives in the <em>Menu.</em>
          </h2>
          <p>
            Browse the full collection, discover favourites and order dishes
            separately from your catering enquiry.
          </p>
        </div>
        <Link href="/menu" className="button outline">
          Explore the Menu <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="catering-home-cta">
        <div className="shell catering-home-cta-card">
          <div className="catering-home-cta-copy">
            <i aria-hidden="true">
              <CalendarDays />
            </i>
            <span className="eyebrow light">Have a date in mind?</span>
            <h2>
              Your celebration,
              <br />
              <em>beautifully handled.</em>
            </h2>
            <p>
              Share your occasion, venue and guest count. We will help shape a
              service plan that feels right for your room and your guests.
            </p>
            <div className="catering-home-cta-actions">
              <Link href="/catering#enquiry" className="button">
                Start Your Enquiry <ArrowRight aria-hidden="true" />
              </Link>
              <a className="text-link" href={`tel:${siteConfig.phone}`}>
                <Phone aria-hidden="true" /> Talk to our team
              </a>
            </div>
          </div>
          <div className="catering-home-cta-visual">
            <Image
              src="/assets/hero-ai/home-enquiry-catering.webp"
              alt="Catering team arranging an elegant evening buffet"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <div className="catering-home-cta-caption">
              <span>Weddings</span>
              <span>Corporate</span>
              <span>Celebrations</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
