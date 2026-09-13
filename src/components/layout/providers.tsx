"use client";
import { Toaster } from "sonner";
import { CartDrawer } from "@/components/cart/cart-drawer";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
      <Toaster position="top-center" richColors />
    </>
  );
}
