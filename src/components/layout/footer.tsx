import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { GoogleReviewStrip } from "@/components/layout/google-review-strip";
import { FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image
            src="/assets/brand/logo-primary.png"
            alt="Sawariyawala Food & Caterers"
            width={1130}
            height={883}
          />
          <p>
            Good food, brighter moments. Premium Indian street-food favourites
            and warm hospitality for every occasion.
          </p>
          <div className="socials">
            <a href={siteConfig.instagram} aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href={siteConfig.facebook} aria-label="Facebook">
              <FacebookIcon />
            </a>
          </div>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/menu">Our Menu</Link>
          <Link href="/our-story">Our Story</Link>
          <Link href="/why-us">Why Us</Link>
          <Link href="/track-order">Track Order</Link>
        </div>
        <div>
          <h3>Meet Us</h3>
          <p>
            <MapPin /> {siteConfig.address}
          </p>
          <p>
            <Phone /> {siteConfig.phone}
          </p>
          <p>
            <Mail /> {siteConfig.email}
          </p>
          <p>
            <Clock3 /> {siteConfig.hours}
          </p>
        </div>
      </div>
      <Suspense fallback={null}>
        <GoogleReviewStrip />
      </Suspense>
      <div className="shell footer-bottom">
        <span>(c) {new Date().getFullYear()} Sawariyawala Food & Caterers</span>
        <span>{siteConfig.tagline}</span>
        <span>
          Created by{" "}
          <a
            href="https://nexmogen.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="nexmogen-credit"
          >
            Nexmogen
          </a>
        </span>
      </div>
    </footer>
  );
}
