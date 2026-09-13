"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { formatMoney } from "@/lib/money";
type Order = {
  _id: string;
  orderNumber: string;
  customer: { fullName: string; phone: string };
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
};
const statuses = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];
export function OrderManager() {
  const [items, setItems] = useState<Order[]>([]),
    [filter, setFilter] = useState("");
  async function load() {
    const r = await fetch(
      `/api/admin/orders${filter ? `?status=${filter}` : ""}`,
    );
    setItems(await r.json());
  }
  useEffect(() => {
    void load();
  }, [filter]);
  async function update(id: string, orderStatus: string) {
    const r = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus }),
    });
    if (!r.ok) return toast.error("Update failed");
    setItems((old) =>
      old.map((x) => (x._id === id ? { ...x, orderStatus } : x)),
    );
    toast.success("Order status updated");
  }
  return (
    <>
      <div className="admin-filters">
        <button
          className={!filter ? "active" : ""}
          onClick={() => setFilter("")}
        >
          All
        </button>
        {statuses.map((x) => (
          <button
            className={filter === x ? "active" : ""}
            onClick={() => setFilter(x)}
            key={x}
          >
            {x.replaceAll("_", " ")}
          </button>
        ))}
      </div>
      <div className="admin-table">
        <div className="admin-row order header">
          <span>Order</span>
          <span>Customer</span>
          <span>Payment</span>
          <span>Total</span>
          <span>Status</span>
        </div>
        {items.map((item) => (
          <div className="admin-row order" key={item._id}>
            <span>
              <Link href={`/admin/orders/${item._id}`}>
                <b>{item.orderNumber}</b>
              </Link>
              <small>{new Date(item.createdAt).toLocaleString("en-IN")}</small>
            </span>
            <span>
              <b>{item.customer.fullName}</b>
              <small>{item.customer.phone}</small>
            </span>
            <span>
              {item.paymentMethod}
              <small>{item.paymentStatus}</small>
            </span>
            <b>{formatMoney(item.total)}</b>
            <select
              value={item.orderStatus}
              onChange={(e) => update(item._id, e.target.value)}
            >
              {statuses.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </>
  );
}
