import { OrderManager } from "@/components/admin/order-manager";
export default function Orders() {
  return (
    <div className="admin-page">
      <span className="eyebrow">Fulfilment</span>
      <h1>Orders</h1>
      <p>Review payments and keep customers informed through status updates.</p>
      <OrderManager />
    </div>
  );
}
