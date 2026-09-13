import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  HeartHandshake,
  Leaf,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
export const metadata: Metadata = { title: "Why Us" };
export default function WhyUs() {
  const cards = [
    [Leaf, "Ingredient-led", "Simple ingredients treated with attention."],
    [
      ShieldCheck,
      "Carefully prepared",
      "A disciplined approach to cleanliness and consistency.",
    ],
    [
      Clock,
      "Made for now",
      "Fresh food, packed and served without unnecessary delay.",
    ],
    [
      HeartHandshake,
      "Warm service",
      "Hospitality designed around real people and occasions.",
    ],
  ];
  return (
    <main>
      <PageHero
        eyebrow="Why Sawariyawala"
        title={
          <>
            What makes us
            <br />
            <em>special.</em>
          </>
        }
        copy="A balanced mix of familiar flavour, clean presentation and service that makes every order feel considered."
        image="/assets/hero-ai/why-us-hero-v2.png"
      />
      <section className="section shell">
        <div className="icon-card-grid">
          {cards.map(([Icon, title, copy]) => (
            <article key={String(title)}>
              <Icon />
              <h3>{String(title)}</h3>
              <p>{String(copy)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section cream-section">
        <div className="shell editorial-split reverse">
          <div className="framed-image">
            <Image
              src="/assets/editorial/packaging.webp"
              alt="Sawariyawala premium packaging system"
              fill
              sizes="50vw"
            />
          </div>
          <div>
            <span className="eyebrow">What makes us special</span>
            <h2>
              Thoughtful from kitchen
              <br />
              <em>to doorstep.</em>
            </h2>
            <ul className="check-list">
              {[
                "Server-authoritative pricing and secure checkout",
                "Pure vegetarian demo catalogue",
                "Food-safe, presentation-ready packaging direction",
                "COD and verified Razorpay payment options",
                "Flexible ordering for everyday and event needs",
              ].map((x) => (
                <li key={x}>
                  <Check />
                  {x}
                </li>
              ))}
            </ul>
            <Link href="/menu" className="button">
              Order Now <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <section className="section shell promise">
        <PackageCheck />
        <span className="eyebrow">Our promise</span>
        <h2>
          Premium in detail.
          <br />
          <em>Warm at heart.</em>
        </h2>
        <p>
          Our goal is not to make street food feel distant or formal. It is to
          keep the joy familiar while making every touchpoint feel clearer,
          cleaner and more considered.
        </p>
      </section>
    </main>
  );
}
