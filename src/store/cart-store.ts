"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, ProductDTO } from "@/types";

interface CartState {
  items: CartLine[];
  drawerOpen: boolean;
  add: (product: ProductDTO, quantity?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      drawerOpen: false,
      add: (product, quantity = 1) =>
        set((state) => {
          const current = state.items.find(
            (line) => line.slug === product.slug,
          );
          const items = current
            ? state.items.map((line) =>
                line.slug === product.slug
                  ? {
                      ...line,
                      quantity: Math.min(25, line.quantity + quantity),
                    }
                  : line,
              )
            : [
                ...state.items,
                {
                  slug: product.slug,
                  name: product.name,
                  image: product.image,
                  price: product.price,
                  quantity: Math.min(25, quantity),
                },
              ];
          return { items, drawerOpen: true };
        }),
      remove: (slug) =>
        set((state) => ({
          items: state.items.filter((line) => line.slug !== slug),
        })),
      setQuantity: (slug, quantity) =>
        set((state) => ({
          items:
            quantity < 1
              ? state.items.filter((line) => line.slug !== slug)
              : state.items.map((line) =>
                  line.slug === slug
                    ? { ...line, quantity: Math.min(25, quantity) }
                    : line,
                ),
        })),
      clear: () => set({ items: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
    }),
    {
      name: "sawariyawala-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
