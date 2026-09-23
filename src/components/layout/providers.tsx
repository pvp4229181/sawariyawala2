"use client";
import { Toaster } from "sonner";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SiteMotion } from "@/components/layout/site-motion";
import { CART_ENABLED } from "@/config/features";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {CART_ENABLED && <CartDrawer />}
      <SiteMotion />
      <Toaster position="top-center" richColors />
    </>
  );
}
