"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CHECKOUT_ENABLED, COMMERCE_PAUSED_MESSAGE } from "@/config/features";
import { formatMoney } from "@/lib/money";
import { useCart } from "@/store/cart-store";
import { siteConfig } from "@/config/site";

export function CartDrawer() {
  const { items, drawerOpen, closeDrawer, setQuantity, remove } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const subtotal = items.reduce((s, x) => s + x.price * x.quantity, 0),
    fee =
      subtotal >= siteConfig.freeDeliveryThreshold
        ? 0
        : siteConfig.deliveryCharge;
  return (
    <div
      className={`drawer-layer ${drawerOpen ? "show" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeDrawer();
      }}
    >
      <aside className="cart-drawer" aria-hidden={!drawerOpen}>
        <div className="drawer-head">
          <div>
            <span className="eyebrow">Your basket</span>
            <h2>
              Cart <i>{items.length}</i>
            </h2>
          </div>
          <button className="icon-button dark" onClick={closeDrawer}>
            <X />
          </button>
        </div>
        {!items.length ? (
          <div className="empty-state">
            <ShoppingBag size={54} />
            <h3>Your basket is waiting</h3>
            <p>Add something delicious from our menu.</p>
            <Link href="/menu" onClick={closeDrawer} className="button">
              Explore Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="drawer-lines">
              {items.map((line) => (
                <div className="cart-line" key={line.slug}>
                  <Image
                    src={line.image}
                    alt={line.name}
                    width={88}
                    height={88}
                  />
                  <div>
                    <h3>{line.name}</h3>
                    <span>{formatMoney(line.price)}</span>
                    <div className="quantity">
                      <button
                        onClick={() =>
                          setQuantity(line.slug, line.quantity - 1)
                        }
                      >
                        <Minus />
                      </button>
                      <b>{line.quantity}</b>
                      <button
                        onClick={() =>
                          setQuantity(line.slug, line.quantity + 1)
                        }
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <div className="line-end">
                    <b>{formatMoney(line.price * line.quantity)}</b>
                    <button
                      onClick={() => remove(line.slug)}
                      aria-label={`Remove ${line.name}`}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawer-summary">
              <div>
                <span>Subtotal</span>
                <b>{formatMoney(subtotal)}</b>
              </div>
              <div>
                <span>Delivery</span>
                <b>{fee ? formatMoney(fee) : "FREE"}</b>
              </div>
              <p>
                {subtotal < siteConfig.freeDeliveryThreshold
                  ? `Add ${formatMoney(siteConfig.freeDeliveryThreshold - subtotal)} more for free delivery.`
                  : "You unlocked free delivery."}
              </p>
              {CHECKOUT_ENABLED ? (
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="button full"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <span
                  className="button full commerce-paused"
                  aria-disabled="true"
                  title={COMMERCE_PAUSED_MESSAGE}
                >
                  Checkout coming soon
                </span>
              )}
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="text-link centered"
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
