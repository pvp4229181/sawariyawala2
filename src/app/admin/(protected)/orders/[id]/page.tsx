import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { connectDB } from "@/lib/db";
import { formatMoney } from "@/lib/money";
import { Order } from "@/models/Order";
export const dynamic = "force-dynamic";
export default async function AdminOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();
  const order = await Order.findById(id).lean();
  if (!order) notFound();
  return (
    <div className="admin-page">
      <Link href="/admin/orders" className="back-link">
        <ArrowLeft />
        Back to orders
      </Link>
      <span className="eyebrow">Order detail</span>
      <h1>{order.orderNumber}</h1>
      <div className="admin-order-detail">
        <section>
          <h2>Customer</h2>
          <p>
            <b>{order.customer.fullName}</b>
            <br />
            {order.customer.phone}
            <br />
            {order.customer.email}
          </p>
          <h2>Delivery</h2>
          <p>
            {order.address.line1}
            <br />
            {order.address.line2}
            <br />
            {order.address.city}, {order.address.state}{" "}
            {order.address.postalCode}
          </p>
        </section>
        <section>
          <h2>Items</h2>
          {order.items.map(
            (item: {
              slug: string;
              name: string;
              quantity: number;
              lineTotal: number;
            }) => (
              <div key={item.slug}>
                <span>
                  {item.quantity} x {item.name}
                </span>
                <b>{formatMoney(item.lineTotal)}</b>
              </div>
            ),
          )}
          <hr />
          <div>
            <span>Total</span>
            <strong>{formatMoney(order.total)}</strong>
          </div>
          <p>
            {order.paymentMethod} / {order.paymentStatus} / {order.orderStatus}
          </p>
        </section>
      </div>
    </div>
  );
}
