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

const promises = [
  [
    "Clear at every step",
    "Straightforward choices, transparent totals and an ordering flow that respects your time.",
  ],
  [
    "Care in every detail",
    "Thoughtful preparation and presentation from the kitchen counter to your doorstep.",
  ],
  [
    "Warm by nature",
    "Familiar food and attentive service that always feel welcoming, never formal.",
  ],
];

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
      <section className="section promise-section">
        <div className="shell promise">
          <div className="promise-copy">
            <div className="promise-mark">
              <PackageCheck />
            </div>
            <span className="eyebrow light">Our promise</span>
            <h2>
              Premium in detail.
              <br />
              <em>Warm at heart.</em>
            </h2>
            <p>
              Street food should never feel distant or overly formal. We keep
              the joy familiar while making every touchpoint clearer, cleaner
              and more considered.
            </p>
            <Link href="/menu" className="button">
              Taste the difference <ArrowRight />
            </Link>
          </div>
          <div className="promise-principles">
            <span>What you can expect</span>
            {promises.map(([title, copy], index) => (
              <article key={title}>
                <i>
                  <Check />
                </i>
                <div>
                  <small>0{index + 1}</small>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
