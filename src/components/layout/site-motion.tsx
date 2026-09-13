"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelectors = [
  ".section-heading",
  ".trust-strip > div",
  ".product-card",
  ".detail-image",
  ".detail-copy",
  ".story-image",
  ".story-copy > *",
  ".benefit-grid article",
  ".quality-banner",
  ".testimonial-grid",
  ".editorial-split > *",
  ".philosophy-grid article",
  ".timeline-intro > *",
  ".timeline-card",
  ".icon-card-grid article",
  ".promise > *",
  ".contact-grid > *",
  ".paper-form",
  ".cart-page-grid > *",
  ".checkout-panel",
  ".checkout-summary",
  ".success-card",
  ".track-wrap > *",
  ".cta-band .shell > *",
  ".footer-grid > *",
].join(",");

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelectors),
    );
    const groupIndexes = new WeakMap<Element, number>();

    for (const element of elements) {
      const parent = element.parentElement;
      const index = parent ? groupIndexes.get(parent) ?? 0 : 0;
      if (parent) groupIndexes.set(parent, index + 1);

      element.dataset.reveal = element.matches(
        ".story-image, .framed-image, .quality-banner",
      )
        ? "image"
        : element.matches(
              ".product-card, .timeline-card, .icon-card-grid article",
            )
          ? "card"
          : "up";
      element.style.setProperty(
        "--reveal-delay",
        `${Math.min(index * 70, 280)}ms`,
      );
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -7%" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
