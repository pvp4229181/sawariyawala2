"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CART_ENABLED } from "@/config/features";
import { useCart } from "@/store/cart-store";

const links = [
  ["/", "Home"],
  ["/our-story", "Our Story"],
  ["/menu", "Menu"],
  ["/catering", "Catering"],
  ["/why-us", "Why Us"],
  ["/contact", "Contact"],
];
export function Header() {
  const pathname = usePathname(),
    [mobile, setMobile] = useState(false),
    [mounted, setMounted] = useState(false),
    openDrawer = useCart((state) => state.openDrawer),
    itemCount = useCart((state) =>
      state.items.reduce((total, line) => total + line.quantity, 0),
    );
  useEffect(() => setMobile(false), [pathname]);
  // The cart is restored from localStorage, so the count only renders once the
  // client has mounted and the server and client markup agree.
  useEffect(() => setMounted(true), []);
  const count = mounted ? itemCount : 0;
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link href="/" className="header-logo" aria-label="Sawariyawala home">
          <Image
            className="header-logo-image"
            src="/assets/brand/logo-mark.png"
            alt="Sawariyawala Food and Caterers"
            width={645}
            height={575}
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
          {CART_ENABLED && (
            <button
              type="button"
              className="icon-button cart-trigger"
              onClick={openDrawer}
              aria-label={
                count ? `Open cart, ${count} items` : "Open cart, empty"
              }
            >
              <ShoppingBag size={19} />
              {count > 0 && <span aria-hidden="true">{count}</span>}
            </button>
          )}
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
        {CART_ENABLED && (
          <Link href="/cart">Cart{count > 0 && ` (${count})`}</Link>
        )}
        <Link className="button" href="/menu">
          Explore Menu
        </Link>
      </div>
    </header>
  );
}
