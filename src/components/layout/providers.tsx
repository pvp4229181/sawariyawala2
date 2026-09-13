"use client";
import { Toaster } from "sonner";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SiteMotion } from "@/components/layout/site-motion";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteMotion />
      <CartDrawer />
      <Toaster position="top-center" richColors />
    </>
  );
}
