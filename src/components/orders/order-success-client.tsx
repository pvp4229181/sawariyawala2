"use client";
import Link from "next/link";
import { CheckCircle2, Clock3, MapPin, PackageCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatMoney } from "@/lib/money";
import type { OrderDTO } from "@/types";
export function OrderSuccessClient({ orderNumber }: { orderNumber: string }) {
  const token = useSearchParams().get("token"),
    [order, setOrder] = useState<OrderDTO | null>(null),
    [error, setError] = useState("");
  useEffect(() => {
    if (!token) {
      setError("This secure confirmation link is incomplete.");
      return;
    }
    fetch(`/api/orders/${orderNumber}?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error);
        setOrder(d);
      })
      .catch((e) => setError(e.message));
  }, [orderNumber, token]);
  if (error)
    return (
      <div className="empty-state page-empty">
        <PackageCheck />
        <h2>Confirmation unavailable</h2>
        <p>{error}</p>
        <Link href="/track-order" className="button">
          Track Order
        </Link>
      </div>
    );
  if (!order)
    return (
      <div className="success-loading">Preparing your confirmation...</div>
    );
  return (
    <div className="success-card">
      <CheckCircle2 className="success-icon" />
      <span className="eyebrow">Order confirmed</span>
      <h1>Thank you, {order.customer.fullName.split(" ")[0]}!</h1>
      <p>Your order has been received and is now in our kitchen queue.</p>
      <div className="success-number">
        <small>Order number</small>
        <b>{order.orderNumber}</b>
      </div>
      <div className="success-grid">
        <div>
          <Clock3 />
          <span>
            <small>Order status</small>
            <b>{order.orderStatus.replaceAll("_", " ")}</b>
          </span>
        </div>
        <div>
          <PackageCheck />
          <span>
            <small>Payment</small>
            <b>
              {order.paymentMethod === "COD"
                ? "Cash on Delivery"
                : order.paymentStatus}
            </b>
          </span>
        </div>
        <div>
          <MapPin />
          <span>
            <small>Delivering to</small>
            <b>
              {order.address.city}, {order.address.postalCode}
            </b>
          </span>
        </div>
      </div>
      <div className="success-lines">
        {order.items.map((item) => (
          <div key={item.slug}>
            <span>
              {item.quantity} x {item.name}
            </span>
            <b>{formatMoney(item.lineTotal)}</b>
          </div>
        ))}
        <hr />
        <div>
          <span>Total</span>
          <strong>{formatMoney(order.total)}</strong>
        </div>
      </div>
      <div className="success-actions">
        <Link href="/menu" className="button">
          Continue Shopping
        </Link>
        <Link href="/track-order" className="button outline">
          Track Order
        </Link>
      </div>
    </div>
  );
}
