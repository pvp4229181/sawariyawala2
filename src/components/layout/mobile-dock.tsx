"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Phone,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CART_ENABLED } from "@/config/features";
import { siteConfig } from "@/config/site";
import { useCart } from "@/store/cart-store";

// Pages that already end in their own primary action keep the screen to it.
const hiddenOn = ["/admin", "/cart", "/checkout", "/order-success"];

/**
 * Thumb-reach quick actions for phones. It waits until the reader has moved
 * past the hero (whose own buttons do the same job) before sliding in.
 */
export function MobileDock() {
  const pathname = usePathname(),
    [visible, setVisible] = useState(false),
    [mounted, setMounted] = useState(false),
    openDrawer = useCart((state) => state.openDrawer),
    itemCount = useCart((state) =>
      state.items.reduce((total, line) => total + line.quantity, 0),
    );
  useEffect(() => setMounted(true), []);
  const count = mounted ? itemCount : 0;
  const hidden = hiddenOn.some((path) => pathname.startsWith(path));

  // The footer reserves room for the dock only on pages that show it.
  useEffect(() => {
    document.documentElement.classList.toggle("has-dock", !hidden);
  }, [hidden]);

  useEffect(() => {
    if (hidden) return;
    const hero = document.querySelector<HTMLElement>(
      ".catering-home-hero, .page-hero",
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(!hero || window.scrollY > hero.offsetHeight * 0.6);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname, hidden]);

  if (hidden) return null;
  return (
    <nav
      className={`mobile-dock ${visible ? "show" : ""}`}
      aria-label="Quick actions"
      inert={!visible}
    >
      <div className="mobile-dock-tabs">
        <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
          <Phone aria-hidden="true" />
          <span>Call</span>
        </a>
        <Link
          href="/menu"
          className={pathname.startsWith("/menu") ? "active" : ""}
          aria-current={pathname === "/menu" ? "page" : undefined}
        >
          <UtensilsCrossed aria-hidden="true" />
          <span>Menu</span>
        </Link>
        {CART_ENABLED && (
          <button
            type="button"
            onClick={openDrawer}
            aria-label={
              count ? `Open cart, ${count} items` : "Open cart, empty"
            }
          >
            <ShoppingBag aria-hidden="true" />
            <span aria-hidden="true">Cart</span>
            {count > 0 && <b aria-hidden="true">{count}</b>}
          </button>
        )}
      </div>
      <Link href="/catering#enquiry" className="mobile-dock-primary">
        Plan an Event
        <i aria-hidden="true">
          <ArrowUpRight />
        </i>
      </Link>
    </nav>
  );
}
