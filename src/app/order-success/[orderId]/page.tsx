import { Suspense } from "react";
import { OrderSuccessClient } from "@/components/orders/order-success-client";
export default async function Success({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return (
    <main className="success-page shell">
      <Suspense fallback={<div className="success-loading">Loading...</div>}>
        <OrderSuccessClient orderNumber={orderId} />
      </Suspense>
    </main>
  );
}
