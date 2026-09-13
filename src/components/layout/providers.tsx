"use client";
import { Toaster } from "sonner";
import { SiteMotion } from "@/components/layout/site-motion";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteMotion />
      <Toaster position="top-center" richColors />
    </>
  );
}
