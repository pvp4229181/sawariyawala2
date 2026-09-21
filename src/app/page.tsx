import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  ChefHat,
  Clock3,
  Heart,
  Leaf,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { ProductCard } from "@/components/menu/product-card";
import { Testimonials } from "@/components/home/testimonials";
import { siteConfig } from "@/config/site";
import { seedProducts } from "@/data/seed-products";

const benefits = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    copy: "Carefully chosen produce and pantry staples.",
  },
  {
    icon: ChefHat,
    title: "Authentic Taste",
    copy: "Familiar flavours, thoughtfully prepared.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Preparation",
    copy: "Clean, disciplined kitchen practices.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    copy: "Packed with care and sent without fuss.",
  },
];

const guestBenefits = [
  {
    icon: ChefHat,
    title: "Food-first menus",
    copy: "A focused selection built for flavour, clarity and quick decisions.",
  },
  {
    icon: Heart,
    title: "Warm hospitality",
    copy: "Friendly service and thoughtful details from counter to doorstep.",
  },
  {
    icon: ShoppingBag,
    title: "Easy enquiries",
    copy: "A simple path to explore the menu and plan food for your occasion.",
  },
  {
    icon: Award,
    title: "Catering that scales",
    copy: "A flexible food experience for intimate gatherings and large events.",
  },
];

export default function Home() {
  const featured = seedProducts.filter((p) => p.featured).slice(0, 4);
  return (
    <main>
      <section className="home-hero">
        <Image
          src="/assets/editorial/home-hero.webp"
          alt="An abundant spread of Indian street-food favourites"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="shell hero-copy">
          <span className="eyebrow light">Authentic Indian Street Food</span>
          <h1>
            Real Flavours.
            <br />
            <em>
              Timeless
              <br />
              Traditions.
            </em>
          </h1>
          <p>
            Street-food favourites, festive catering and warm hospitality -
            brought together with a premium Sawariyawala touch.
          </p>
          <div className="hero-actions">
            <Link href="/catering" className="button">
              Plan an Event <ArrowRight />
            </Link>
            <Link href="/menu" className="button ghost">
              Explore Menu
            </Link>
          </div>
          <div className="hero-mini">
            <span>
              <Clock3 />
              Made fresh
            </span>
            <span>
              <Leaf />
              Pure vegetarian
            </span>
            <span>
              <Heart />
              Made for sharing
            </span>
          </div>
        </div>
      </section>
      <section className="trust-strip shell">
        {benefits.map(({ icon: Icon, title, copy }) => (
          <div key={title}>
            <Icon />
            <span>
              <b>{title}</b>
              <small>{copy}</small>
            </span>
          </div>
        ))}
      </section>
      <section className="section shell">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">Crowd favourites</span>
            <h2>
              Meet the <em>bestsellers</em>
            </h2>
          </div>
          <Link href="/menu" className="text-link">
            View all dishes <ArrowRight />
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
      <section className="story-teaser">
        <div className="shell story-grid">
          <div className="story-image">
            <Image
              src="/assets/editorial/story-stall.webp"
              alt="Sawariyawala storefront brand concept"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
          <div className="story-copy">
            <span className="eyebrow light">Our philosophy</span>
            <h2>
              More than food.
              <br />
              <em>It is a feeling.</em>
            </h2>
            <p>
              Sawariyawala brings Indian street-food culture into a polished
              hospitality experience. Food stays at the centre; the details
              around it add warmth, care and a sense of occasion.
            </p>
            <ul>
              <li>
                <Sparkles />
                Recognisable Indian flavours
              </li>
              <li>
                <Award />
                Premium, restrained presentation
              </li>
              <li>
                <Heart />
                Service shaped around togetherness
              </li>
            </ul>
            <Link href="/our-story" className="button">
              Discover Our Story <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <section className="section shell">
        <div className="section-heading center">
          <span className="eyebrow">Why guests choose us</span>
          <h2>
            Food that brings <em>people together</em>
          </h2>
          <p>
            Every detail is designed to make everyday cravings and special
            occasions feel equally cared for.
          </p>
        </div>
        <div className="benefit-grid">
          {guestBenefits.map(({ icon: Icon, title, copy }, index) => (
            <article key={title}>
              <div className="benefit-card-inner">
                <div className="benefit-card-head">
                  <span>0{index + 1}</span>
                  <i>
                    <Icon />
                  </i>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="quality-banner shell">
        <Image
          src="/assets/editorial/quality-banner.webp"
          alt="Sawariyawala premium service counter"
          fill
          sizes="100vw"
        />
        <div className="quality-overlay" />
        <div>
          <span className="eyebrow light">{siteConfig.tagline}</span>
          <h2>
            Good food.
            <br />
            <em>Brighter moments.</em>
          </h2>
          <Link href="/catering" className="button">
            Plan an Event <ArrowRight />
          </Link>
        </div>
      </section>
      <section
        className="food-strip"
        aria-label="A celebration of Indian street food"
      >
        <Image
          src="/assets/banner-ai/home-food-panorama-v3.png"
          alt="An illustrated Indian street-food courtyard with chefs, diners and Sawariyawala favourites"
          fill
          sizes="100vw"
        />
      </section>
      <Testimonials />
    </main>
  );
}
