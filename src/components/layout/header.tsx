"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart-store";

const links = [
  ["/", "Home"],
  ["/our-story", "Our Story"],
  ["/menu", "Menu"],
  ["/why-us", "Why Us"],
  ["/contact", "Contact"],
];
export function Header() {
  const pathname = usePathname(),
    [mobile, setMobile] = useState(false),
    items = useCart((s) => s.items),
    openCart = useCart((s) => s.openDrawer);
  const count = items.reduce((sum, line) => sum + line.quantity, 0);
  useEffect(() => setMobile(false), [pathname]);
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link href="/" className="header-logo" aria-label="Sawariyawala home">
          <Image
            src="/assets/brand/logo-primary.png"
            alt=""
            width={1130}
            height={883}
            priority
          />
          <span className="header-wordmark" aria-hidden="true">
            <strong>Sawariyawala</strong>
            <small>Food &amp; Caterers</small>
          </span>
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
          <button
            className="icon-button cart-trigger"
            onClick={openCart}
            aria-label={`Open cart with ${count} items`}
          >
            <ShoppingBag size={20} />
            {count > 0 && <span>{count}</span>}
          </button>
          <Link href="/menu" className="button button-small">
            Order Now
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
        <Link className="button" href="/track-order">
          Track Order
        </Link>
      </div>
    </header>
  );
}
