"use client";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { COMMERCE_ENABLED } from "@/config/features";
import type { ProductDTO } from "@/types";
import { useCart } from "@/store/cart-store";

export function AddButton({
  product,
  label = "Add",
}: {
  product: ProductDTO;
  label?: string;
}) {
  if (!COMMERCE_ENABLED) {
    return (
      <span
        className="commerce-paused"
        aria-label="Online ordering coming soon"
      >
        Ordering soon
      </span>
    );
  }

  return <EnabledAddButton product={product} label={label} />;
}

function EnabledAddButton({
  product,
  label,
}: {
  product: ProductDTO;
  label: string;
}) {
  const add = useCart((s) => s.add);
  const setQuantity = useCart((s) => s.setQuantity);
  const quantity = useCart(
    (s) => s.items.find((item) => item.slug === product.slug)?.quantity ?? 0,
  );

  if (quantity > 0) {
    return (
      <div
        className="item-stepper"
        role="group"
        aria-label={`${product.name} quantity`}
      >
        <button
          type="button"
          aria-label={`Remove one ${product.name}`}
          onClick={() => setQuantity(product.slug, quantity - 1)}
        >
          <Minus aria-hidden="true" />
        </button>
        <span aria-live="polite" aria-label={`${quantity} in cart`}>
          {quantity}
        </span>
        <button
          type="button"
          aria-label={`Add one more ${product.name}`}
          disabled={quantity >= 25}
          onClick={() => setQuantity(product.slug, quantity + 1)}
        >
          <Plus aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
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
