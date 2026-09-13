"use client";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { ProductDTO } from "@/types";
import { useCart } from "@/store/cart-store";

export function AddButton({
  product,
  label = "Add",
}: {
  product: ProductDTO;
  label?: string;
}) {
  const add = useCart((s) => s.add);
  return (
    <button
      className="add-button"
      disabled={!product.inStock}
      onClick={() => {
        add(product);
        toast.success(`${product.name} added to cart`);
      }}
    >
      {label}
      <Plus size={16} />
    </button>
  );
}
