"use client";
import Image from "next/image";
import {
  Check,
  ChevronRight,
  CreditCard,
  Landmark,
  LockKeyhole,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";
import { formatMoney } from "@/lib/money";
import { useCart } from "@/store/cart-store";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}
function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
export function CheckoutClient() {
  const { items, clear } = useCart(),
    router = useRouter(),
    [mounted, setMounted] = useState(false),
    [method, setMethod] = useState<"COD" | "RAZORPAY">("COD"),
    [loading, setLoading] = useState(false);
  useEffect(() => setMounted(true), []);
  const subtotal = useMemo(
      () => items.reduce((s, x) => s + x.price * x.quantity, 0),
      [items],
    ),
    delivery =
      subtotal >= siteConfig.freeDeliveryThreshold
        ? 0
        : siteConfig.deliveryCharge,
    total = subtotal + delivery;
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!items.length) return;
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      customer: {
        fullName: form.get("fullName"),
        phone: form.get("phone"),
        email: form.get("email"),
      },
      address: {
        line1: form.get("line1"),
        line2: form.get("line2"),
        city: form.get("city"),
        state: form.get("state"),
        postalCode: form.get("postalCode"),
      },
      deliveryNotes: form.get("deliveryNotes"),
      orderNotes: form.get("orderNotes"),
      paymentMethod: method,
      items: items.map((x) => ({ slug: x.slug, quantity: x.quantity })),
    };
    try {
      const response = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      if (method === "COD") {
        clear();
        router.push(
          `/order-success/${result.orderNumber}?token=${result.accessToken}`,
        );
        return;
      }
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Could not load the secure payment window.");
      new window.Razorpay({
        key: result.razorpayKey,
        amount: result.razorpayOrder.amount,
        currency: "INR",
        name: "Sawariyawala Food & Caterers",
        description: `Order ${result.orderNumber}`,
        order_id: result.razorpayOrder.id,
        prefill: {
          name: payload.customer.fullName,
          email: payload.customer.email,
          contact: payload.customer.phone,
        },
        theme: { color: "#F28C00" },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.info("Payment cancelled. Your cart is unchanged.");
          },
        },
        handler: async (payment: Record<string, string>) => {
          const verify = await fetch("/api/payments/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...payment,
              orderNumber: result.orderNumber,
            }),
          });
          const verified = await verify.json();
          if (!verify.ok) {
            toast.error(verified.error);
            setLoading(false);
            return;
          }
          clear();
          router.push(
            `/order-success/${result.orderNumber}?token=${result.accessToken}`,
          );
        },
      }).open();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Checkout failed");
      setLoading(false);
    }
  }
  if (!mounted) return <div className="checkout-skeleton" />;
  if (!items.length)
    return (
      <div className="empty-state checkout-empty">
        <ShoppingBag />
        <h2>Your cart is empty</h2>
        <a className="button" href="/menu">
          Return to Menu
        </a>
      </div>
    );
  return (
    <>
      <div className="checkout-steps">
        <span className="done">
          <i>
            <Check />
          </i>
          Cart
        </span>
        <ChevronRight />
        <span className="active">
          <i>2</i>Details & Payment
        </span>
        <ChevronRight />
        <span>
          <i>3</i>Confirmation
        </span>
      </div>
      <form className="checkout-grid" onSubmit={submit}>
        <div className="checkout-main">
          <section className="checkout-panel">
            <div className="panel-title">
              <span>01</span>
              <div>
                <h2>Customer details</h2>
                <p>We will use these details for your order.</p>
              </div>
            </div>
            <div className="form-row">
              <label>
                Full name
                <input required name="fullName" autoComplete="name" />
              </label>
              <label>
                Phone
                <input
                  required
                  name="phone"
                  pattern="[6-9][0-9]{9}"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit number"
                />
              </label>
            </div>
            <label>
              Email <small>(optional)</small>
              <input name="email" type="email" autoComplete="email" />
            </label>
          </section>
          <section className="checkout-panel">
            <div className="panel-title">
              <span>02</span>
              <div>
                <h2>Delivery address</h2>
                <p>Tell us where to bring your order.</p>
              </div>
            </div>
            <label>
              Address line 1
              <input required name="line1" autoComplete="address-line1" />
            </label>
            <label>
              Address line 2 <small>(optional)</small>
              <input name="line2" autoComplete="address-line2" />
            </label>
            <div className="form-row three">
              <label>
                City
                <input required name="city" />
              </label>
              <label>
                State
                <input required name="state" />
              </label>
              <label>
                Postal code
                <input
                  required
                  name="postalCode"
                  pattern="[0-9]{6}"
                  inputMode="numeric"
                />
              </label>
            </div>
            <label>
              Delivery notes
              <textarea
                name="deliveryNotes"
                rows={2}
                placeholder="Landmark, floor, gate instructions..."
              />
            </label>
          </section>
          <section className="checkout-panel">
            <div className="panel-title">
              <span>03</span>
              <div>
                <h2>Choose payment</h2>
                <p>Select your preferred payment method.</p>
              </div>
            </div>
            <div className="payment-options">
              <button
                type="button"
                onClick={() => setMethod("COD")}
                className={method === "COD" ? "selected" : ""}
              >
                <Landmark />
                <span>
                  <b>Cash on Delivery</b>
                  <small>Pay when your food arrives</small>
                </span>
                {method === "COD" && <Check />}
              </button>
              <button
                type="button"
                onClick={() => setMethod("RAZORPAY")}
                className={method === "RAZORPAY" ? "selected" : ""}
              >
                <CreditCard />
                <span>
                  <b>Razorpay</b>
                  <small>UPI, cards, netbanking and wallets</small>
                </span>
                {method === "RAZORPAY" && <Check />}
              </button>
            </div>
            <label>
              Order notes <small>(optional)</small>
              <textarea name="orderNotes" rows={2} />
            </label>
          </section>
        </div>
        <aside className="checkout-summary">
          <span className="eyebrow">Your order</span>
          <h2>Order summary</h2>
          <div className="summary-lines">
            {items.map((line) => (
              <div key={line.slug}>
                <Image src={line.image} alt="" width={62} height={50} />
                <span>
                  <b>{line.name}</b>
                  <small>
                    {line.quantity} x {formatMoney(line.price)}
                  </small>
                </span>
                <strong>{formatMoney(line.price * line.quantity)}</strong>
              </div>
            ))}
          </div>
          <div className="summary-price">
            <div>
              <span>Subtotal</span>
              <b>{formatMoney(subtotal)}</b>
            </div>
            <div>
              <span>Delivery</span>
              <b>{delivery ? formatMoney(delivery) : "FREE"}</b>
            </div>
            <hr />
            <div className="grand-total">
              <span>Total</span>
              <b>{formatMoney(total)}</b>
            </div>
          </div>
          <div className="selected-payment">
            <PackageCheck />
            <span>
              <small>Payment method</small>
              <b>
                {method === "COD"
                  ? "Cash on Delivery"
                  : "Razorpay Secure Checkout"}
              </b>
            </span>
          </div>
          <button className="button full pay-button" disabled={loading}>
            {loading
              ? "Processing..."
              : method === "COD"
                ? `Place COD Order · ${formatMoney(total)}`
                : `Pay Securely · ${formatMoney(total)}`}
          </button>
          <p className="secure-note">
            <LockKeyhole />
            Your totals are recalculated securely on the server.
          </p>
        </aside>
      </form>
    </>
  );
}
