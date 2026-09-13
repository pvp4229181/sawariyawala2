"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  ["/", "Home"],
  ["/our-story", "Our Story"],
  ["/menu", "Menu"],
  ["/why-us", "Why Us"],
  ["/contact", "Contact"],
];
export function Header() {
  const pathname = usePathname(),
    [mobile, setMobile] = useState(false);
  useEffect(() => setMobile(false), [pathname]);
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link href="/" className="header-logo" aria-label="Sawariyawala home">
          <Image
            className="header-logo-image"
            src="/assets/brand/logo-primary.png"
            alt="Sawariyawala Food and Caterers"
            width={1130}
            height={883}
            priority
          />
          <Image
            className="header-wordmark-image"
            src="/assets/brand/wordmark-primary.svg"
            alt=""
            width={1129}
            height={236}
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([href, label]) => (
            <Link
              key={href}
              className={pathname === href ? "active" : ""}
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            href="/menu"
            className="icon-button search-button"
            aria-label="Search menu"
          >
            <Search size={19} />
          </Link>
          <Link href="/menu" className="button button-small">
            View Menu
          </Link>
          <button
            className="icon-button mobile-toggle"
            onClick={() => setMobile(!mobile)}
            aria-label="Toggle menu"
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <div className={`mobile-nav ${mobile ? "open" : ""}`}>
        {links.map(([href, label]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
        <Link className="button" href="/menu">
          Explore Menu
        </Link>
      </div>
    </header>
  );
}
