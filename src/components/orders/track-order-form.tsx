"use client";
import { Check, PackageSearch } from "lucide-react";
import { useState } from "react";
import { formatMoney } from "@/lib/money";
type Result = {
  orderNumber: string;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  total: number;
  timeline: Array<{ status: string; at: string; note?: string }>;
};
const stages = ["CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];
export function TrackOrderForm() {
  const [result, setResult] = useState<Result | null>(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const f = new FormData(e.currentTarget),
      r = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber: f.get("orderNumber"),
          identifier: f.get("identifier"),
        }),
      }),
      d = await r.json();
    setLoading(false);
    if (!r.ok) {
      setError(d.error);
      setResult(null);
    } else setResult(d);
  }
  return (
    <div className="track-wrap">
      <form className="paper-form compact" onSubmit={submit}>
        <PackageSearch />
        <h2>Find your order</h2>
        <p>Enter the order number and the phone or email used at checkout.</p>
        <label>
          Order number
          <input required name="orderNumber" placeholder="SW-..." />
        </label>
        <label>
          Phone or email
          <input required name="identifier" />
        </label>
        <button className="button full" disabled={loading}>
          {loading ? "Searching..." : "Track Order"}
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
      {result && (
        <section className="tracking-result">
          <span className="eyebrow">Order {result.orderNumber}</span>
          <h2>{result.orderStatus.replaceAll("_", " ")}</h2>
          <p>
            {result.paymentMethod} · {result.paymentStatus} ·{" "}
            {formatMoney(result.total)}
          </p>
          <div className="tracking-steps">
            {stages.map((stage, i) => {
              const current = Math.max(0, stages.indexOf(result.orderStatus)),
                done = i <= current;
              return (
                <div className={done ? "done" : ""} key={stage}>
                  <i>{done ? <Check /> : i + 1}</i>
                  <span>{stage.replaceAll("_", " ")}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
