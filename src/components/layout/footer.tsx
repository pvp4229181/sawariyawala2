import Image from "next/image";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.6 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.7-1.6H17V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.3 1.5-4.3 4.4v2.2H7.4v3.2h2.8V22h3.4Z" />
    </svg>
  );
}

const footerLinks = [
  ["/catering", "Catering services"],
  ["/menu", "Explore the menu"],
  ["/our-story", "Our story"],
  ["/why-us", "Why Sawariyawala"],
  ["/contact", "Contact us"],
];

export function Footer() {
  const phoneHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;

  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Sawariyawala home">
            <Image
              src="/assets/brand/logo-primary.png"
              alt="Sawariyawala Food & Caterers"
              width={1130}
              height={883}
            />
          </Link>
          <p>
            Thoughtful vegetarian catering, warm Indian hospitality and
            beautifully handled celebrations of every size.
          </p>
          <div className="footer-socials">
            <a
              className="social-instagram"
              href={siteConfig.instagram}
              aria-label="Follow us on Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              className="social-facebook"
              href={siteConfig.facebook}
              aria-label="Follow us on Facebook"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <h3>Explore</h3>
          {footerLinks.map(([href, label]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="footer-contact">
          <h3>Talk to us</h3>
          <a href={phoneHref}>
            <Phone aria-hidden="true" />
            <span>
              <small>Call our team</small>
              {siteConfig.phone}
            </span>
          </a>
          <a href={`mailto:${siteConfig.email}`}>
            <Mail aria-hidden="true" />
            <span>
              <small>Email us</small>
              {siteConfig.email}
            </span>
          </a>
          <p>
            <MapPin aria-hidden="true" />
            <span>
              <small>Find us</small>
              {siteConfig.address}
            </span>
          </p>
          <p>
            <Clock3 aria-hidden="true" />
            <span>
              <small>Open daily</small>
              {siteConfig.hours}
            </span>
          </p>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Sawariyawala Food & Caterers</span>
        <span>Tradition · Taste · Togetherness</span>
        <span>
          Created by{" "}
          <a
            className="nexmogen-link"
            href="https://www.nexmogen.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nexmogen
          </a>
        </span>
      </div>
      <div className="footer-city" aria-hidden="true" />
    </footer>
  );
}
