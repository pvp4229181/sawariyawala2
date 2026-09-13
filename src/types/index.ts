export type CategorySlug =
  "snacks" | "chaat" | "street-favourites" | "beverages";

export interface ProductDTO {
  _id?: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: CategorySlug;
  price: number;
  compareAtPrice?: number;
  image: string;
  gallery: string[];
  ingredients: string[];
  tags: string[];
  badges: string[];
  vegetarian: boolean;
  featured: boolean;
  bestseller: boolean;
  inStock: boolean;
  sortOrder: number;
  active: boolean;
}

export interface CartLine {
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderDTO {
  orderNumber: string;
  customer: { fullName: string; phone: string; email?: string };
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
  };
  items: Array<{
    name: string;
    slug: string;
    image: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
  }>;
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  paymentMethod: "COD" | "RAZORPAY";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  orderStatus:
    | "PENDING"
    | "CONFIRMED"
    | "PREPARING"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";
  timeline: Array<{ status: string; at: string; note?: string }>;
  createdAt?: string;
}
