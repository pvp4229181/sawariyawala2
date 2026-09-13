import { connectDB } from "@/lib/db";
import { ContactMessage } from "@/models/ContactMessage";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { formatMoney } from "@/lib/money";
export const dynamic = "force-dynamic";
export default async function Dashboard() {
  await connectDB();
  const [products, orders, messages, revenue] = await Promise.all([
    Product.countDocuments({ active: true }),
    Order.countDocuments(),
    ContactMessage.countDocuments({ status: "NEW" }),
    Order.aggregate([
      { $match: { paymentStatus: "PAID" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]),
  ]);
  return (
    <div className="admin-page">
      <span className="eyebrow">Operations</span>
      <h1>Dashboard</h1>
      <div className="metric-grid">
        <article>
          <small>Active products</small>
          <b>{products}</b>
        </article>
        <article>
          <small>Total orders</small>
          <b>{orders}</b>
        </article>
        <article>
          <small>New messages</small>
          <b>{messages}</b>
        </article>
        <article>
          <small>Paid revenue</small>
          <b>{formatMoney(revenue[0]?.total || 0)}</b>
        </article>
      </div>
      <div className="admin-welcome">
        <h2>Welcome back.</h2>
        <p>
          Use the navigation to edit pricing and availability, review orders,
          update fulfilment status, and respond to customer messages.
        </p>
      </div>
    </div>
  );
}
