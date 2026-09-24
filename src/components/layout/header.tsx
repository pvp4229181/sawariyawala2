"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CART_ENABLED } from "@/config/features";
import { siteConfig } from "@/config/site";
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
    [scrolled, setScrolled] = useState(false),
    [tucked, setTucked] = useState(false),
    toggleRef = useRef<HTMLButtonElement>(null),
    closeRef = useRef<HTMLButtonElement>(null),
    openDrawer = useCart((state) => state.openDrawer),
    itemCount = useCart((state) =>
      state.items.reduce((total, line) => total + line.quantity, 0),
    );
  useEffect(() => setMobile(false), [pathname]);
  // The cart is restored from localStorage, so the count only renders once the
  // client has mounted and the server and client markup agree.
  useEffect(() => setMounted(true), []);
  const count = mounted ? itemCount : 0;

  // On phones the header turns solid once the page moves, slides away while
  // the reader scrolls down and returns as soon as they scroll back up.
  useEffect(() => {
    let last = window.scrollY,
      frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) < 8) return;
      setTucked(y > last && y > 180);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  // Sticky page toolbars (the menu filters) read this to sit under the header.
  useEffect(() => {
    document.documentElement.dataset.header = tucked ? "tucked" : "shown";
  }, [tucked]);

  // The menu sheet owns the screen while open: lock scrolling, close on
  // Escape and hand focus back to the toggle when it closes.
  const wasOpen = useRef(false);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("menu-open", mobile);
    if (mobile) closeRef.current?.focus();
    else if (wasOpen.current) toggleRef.current?.focus();
    wasOpen.current = mobile;
    if (!mobile) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobile(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.classList.remove("menu-open");
    };
  }, [mobile]);

  const close = () => setMobile(false);
  const headerState = [
    "site-header",
    scrolled && "is-scrolled",
    tucked && !mobile && "is-tucked",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <>
      <div
        id="mobile-menu"
        className={`mobile-sheet ${mobile ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!mobile}
      >
        <div className="mobile-sheet-top shell">
          <Link
            href="/"
            className="mobile-sheet-logo"
            aria-label="Sawariyawala home"
            onClick={close}
          >
            <span>
              <Image
                src="/assets/brand/logo-mark.png"
                alt=""
                width={645}
                height={575}
              />
            </span>
            <Image
              src="/assets/brand/wordmark-primary.svg"
              alt=""
              width={1129}
              height={236}
            />
          </Link>
          <button
            ref={closeRef}
            type="button"
            className="icon-button mobile-sheet-close"
            onClick={close}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>
        <nav className="mobile-sheet-nav shell" aria-label="Mobile navigation">
          {links.map(([href, label], index) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              className={pathname === href ? "active" : ""}
              aria-current={pathname === href ? "page" : undefined}
              style={{ "--i": index } as React.CSSProperties}
            >
              <small>0{index + 1}</small>
              <span>{label}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className="mobile-sheet-foot shell">
          <Link className="button" href="/catering#enquiry" onClick={close}>
            Plan an Event <ArrowRight aria-hidden="true" />
          </Link>
          <div className="mobile-sheet-contact">
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
              <Phone aria-hidden="true" />
              <span>
                <small>Call us</small>
                {siteConfig.phone}
              </span>
            </a>
            <a href={`mailto:${siteConfig.email}`}>
              <Mail aria-hidden="true" />
              <span>
                <small>Email</small>
                Write to us
              </span>
            </a>
          </div>
          <p>
            <Clock3 aria-hidden="true" /> {siteConfig.hours}
          </p>
        </div>
      </div>
      <header className={headerState}>
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
            <Link href="/catering#enquiry" className="button button-small">
              Plan an Event
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
              ref={toggleRef}
              type="button"
              className="icon-button mobile-toggle"
              onClick={() => setMobile(true)}
              aria-label="Open menu"
              aria-expanded={mobile}
              aria-controls="mobile-menu"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
