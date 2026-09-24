"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const cardSelectors = [
  ".product-card",
  ".review-form-card",
  ".timeline-card",
  ".icon-card-grid article",
  ".philosophy-grid article",
  ".service-card",
  ".scale-grid article",
  ".catering-steps article",
  ".promise-principles article",
  ".catering-home-occasion-grid article",
  ".catering-home-format-grid article",
  ".catering-home-scale-grid article",
  ".catering-home-process-grid article",
].join(",");

const imageSelectors = [
  ".story-image",
  ".framed-image",
  ".detail-image",
  ".quality-banner",
  ".catering-home-intro-visual",
  ".catering-home-cta-card",
].join(",");

const revealSelectors = [
  cardSelectors,
  imageSelectors,
  ".section-heading",
  ".trust-strip > div",
  ".detail-copy",
  ".review-submit-intro > *",
  ".story-copy > *",
  ".benefit-grid article",
  ".testimonial-grid",
  ".editorial-split > *",
  ".timeline-intro > *",
  ".occasion-cloud > *",
  ".promise-copy > *",
  ".contact-grid > *",
  ".paper-form",
  ".cart-page-grid > *",
  ".checkout-panel",
  ".checkout-summary",
  ".success-card",
  ".track-wrap > *",
  ".cta-band .shell > *",
  ".catering-home-intro-copy > *",
  ".catering-home-scale-heading > *",
  ".catering-home-menu-bridge",
  ".footer-cta > *",
  ".footer-main > *",
].join(",");

// Cards lean toward the pointer on devices with a precise hover pointer.
const tiltSelectors = [
  cardSelectors,
  ".framed-image",
  ".catering-home-image",
  ".catering-home-cta-card",
].join(",");
const gentleTiltSelectors =
  ".framed-image, .catering-home-image, .catering-home-cta-card";

// Media that drifts inside its frame while the page scrolls.
const parallaxSelectors = [
  ".framed-image img",
  ".story-image img",
  ".catering-home-image img",
  ".catering-home-cta-visual img",
  ".catering-home-quote",
].join(",");

const heroSelectors = ".catering-home-hero, .page-hero";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const cleanups: Array<() => void> = [];

    /* Scroll-linked progress, hero depth and parallax */
    const heroes = reduceMotion
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>(heroSelectors));
    const parallax = reduceMotion
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>(parallaxSelectors));
    for (const element of parallax) {
      element.dataset.parallax = element.matches(".catering-home-quote")
        ? "float"
        : "media";
    }

    let scrollFrame = 0;
    const updateScroll = () => {
      scrollFrame = 0;
      const viewport = window.innerHeight;
      const scrollable = root.scrollHeight - viewport;
      // Read every rect first, then write, so the loop never forces layout.
      const heroRects = heroes.map((hero) => hero.getBoundingClientRect());
      const parallaxRects = parallax.map((el) => el.getBoundingClientRect());

      root.style.setProperty(
        "--scroll-progress",
        scrollable > 0 ? clamp(window.scrollY / scrollable, 0, 1).toFixed(4) : "0",
      );
      heroes.forEach((hero, index) => {
        const rect = heroRects[index];
        const progress = clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
        hero.style.setProperty("--hero-p", progress.toFixed(4));
      });
      parallax.forEach((element, index) => {
        const rect = parallaxRects[index];
        if (rect.bottom < -200 || rect.top > viewport + 200) return;
        const offset = rect.top + rect.height / 2 - viewport / 2;
        const progress = clamp(offset / (viewport / 2 + rect.height / 2), -1, 1);
        element.style.setProperty("--p", progress.toFixed(4));
      });
    };
    const requestScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    };
    window.addEventListener("scroll", requestScroll, { passive: true });
    window.addEventListener("resize", requestScroll);
    updateScroll();
    cleanups.push(() => {
      window.removeEventListener("scroll", requestScroll);
      window.removeEventListener("resize", requestScroll);
      cancelAnimationFrame(scrollFrame);
      for (const element of parallax) {
        delete element.dataset.parallax;
        element.style.removeProperty("--p");
      }
      for (const hero of heroes) hero.style.removeProperty("--hero-p");
    });

    if (reduceMotion) return () => cleanups.forEach((cleanup) => cleanup());

    /* 3D scroll reveals */
    // On phones some card grids become swipe rows. Cards parked off to the
    // side would stay hidden until swiped, so the row reveals as one piece.
    const swipeRows = new Set<HTMLElement>();
    const matched = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelectors),
    ).flatMap((element) => {
      const parent = element.parentElement;
      if (!parent || !/auto|scroll/.test(getComputedStyle(parent).overflowX))
        return [element];
      if (swipeRows.has(parent)) return [];
      swipeRows.add(parent);
      return [parent];
    });
    const matchedSet = new Set<Element>(matched);
    const viewport = window.innerHeight;
    const elements = matched.filter((element) => {
      // Nested reveals would compound transforms; the outer one carries both.
      for (let p = element.parentElement; p; p = p.parentElement) {
        if (matchedSet.has(p)) return false;
      }
      // Content already on screen stays put instead of blinking out and back.
      const rect = element.getBoundingClientRect();
      return rect.top > viewport * 0.92 || rect.bottom < 0;
    });
    const groupIndexes = new WeakMap<Element, number>();
    const timers = new Set<number>();

    for (const element of elements) {
      const parent = element.parentElement;
      const index = parent ? (groupIndexes.get(parent) ?? 0) : 0;
      if (parent) groupIndexes.set(parent, index + 1);

      const delay = Math.min(index * 90, 360);
      element.style.setProperty("--reveal-delay", `${delay}ms`);
      if (element.matches(cardSelectors)) {
        element.dataset.reveal = "card";
      } else if (element.matches(imageSelectors)) {
        element.dataset.reveal = "image";
        // Images swing in from the side they sit on.
        const rect = element.getBoundingClientRect();
        const fromLeft = rect.left + rect.width / 2 < window.innerWidth / 2;
        element.style.setProperty("--reveal-turn", fromLeft ? "14deg" : "-14deg");
        element.style.setProperty("--reveal-origin", fromLeft ? "0% 50%" : "100% 50%");
      } else {
        element.dataset.reveal = "up";
      }
    }

    // Once revealed, hand the element back to its own hover transitions.
    const settle = (element: HTMLElement) => {
      const delay = parseFloat(element.style.getPropertyValue("--reveal-delay"));
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        delete element.dataset.reveal;
        element.classList.remove("is-visible");
        for (const name of ["--reveal-delay", "--reveal-turn", "--reveal-origin"]) {
          element.style.removeProperty(name);
        }
      }, (delay || 0) + 1150);
      timers.add(timer);
    };

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
        settle(element);
      });
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = entry.target as HTMLElement;
            element.classList.add("is-visible");
            observer.unobserve(element);
            settle(element);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -8%" },
      );
      elements.forEach((element) => observer.observe(element));
      cleanups.push(() => observer.disconnect());
    }
    cleanups.push(() => {
      timers.forEach((timer) => window.clearTimeout(timer));
      for (const element of elements) {
        delete element.dataset.reveal;
        element.classList.remove("is-visible");
      }
    });

    /* Pointer tilt */
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const tiltable = Array.from(
        document.querySelectorAll<HTMLElement>(tiltSelectors),
      );
      for (const element of tiltable) element.dataset.tilt = "";
      let active: HTMLElement | null = null;
      let pointer: PointerEvent | null = null;
      let tiltFrame = 0;

      const release = (element: HTMLElement) => {
        element.classList.remove("is-tilting");
        element.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
        element.style.transform = "";
        window.setTimeout(() => {
          if (element !== active) element.style.transition = "";
        }, 650);
      };
      const applyTilt = () => {
        tiltFrame = 0;
        const event = pointer;
        if (!event) return;
        const target =
          event.target instanceof Element
            ? event.target.closest<HTMLElement>("[data-tilt]")
            : null;
        const element = target && !target.dataset.reveal ? target : null;
        if (active && active !== element) release(active);
        active = element;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        const max = element.matches(gentleTiltSelectors) ? 3.5 : 9;
        const lift = element.matches(gentleTiltSelectors) ? 0 : -6;
        element.classList.add("is-tilting");
        element.style.transition = "transform 0.14s ease-out";
        element.style.transform = `perspective(1000px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translate3d(0, ${lift}px, 0)`;
      };
      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
        pointer = event;
        if (!tiltFrame) tiltFrame = requestAnimationFrame(applyTilt);
      };
      const onPointerOut = (event: PointerEvent) => {
        if (event.relatedTarget) return;
        pointer = null;
        if (active) release(active);
        active = null;
      };
      document.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerout", onPointerOut);
      cleanups.push(() => {
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerout", onPointerOut);
        cancelAnimationFrame(tiltFrame);
        for (const element of tiltable) delete element.dataset.tilt;
        if (active) {
          active.classList.remove("is-tilting");
          active.style.transform = "";
          active.style.transition = "";
        }
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
