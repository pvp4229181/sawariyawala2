import { z } from "zod";

const text = (max: number) => z.string().trim().min(1).max(max);
export const cartItemSchema = z.object({
  slug: text(100),
  quantity: z.number().int().min(1).max(25),
});
export const checkoutSchema = z.object({
  customer: z.object({
    fullName: text(100),
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
    email: z.union([z.literal(""), z.email()]).optional(),
  }),
  address: z.object({
    line1: text(200),
    line2: z.string().trim().max(200).optional(),
    city: text(80),
    state: text(80),
    postalCode: z
      .string()
      .regex(/^\d{6}$/, "Enter a valid 6-digit postal code"),
  }),
  items: z.array(cartItemSchema).min(1).max(50),
  paymentMethod: z.enum(["COD", "RAZORPAY"]),
  deliveryNotes: z.string().trim().max(500).optional(),
  orderNotes: z.string().trim().max(500).optional(),
});
export const contactSchema = z.object({
  name: text(100),
  email: z.email(),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/),
  message: text(1500),
});
export const trackSchema = z.object({
  orderNumber: text(40),
  identifier: text(120),
});
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(200),
});
export const statusSchema = z.object({
  orderStatus: z.enum([
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
  ]),
});

export function safeError(error: unknown) {
  if (error instanceof z.ZodError)
    return error.issues[0]?.message ?? "Invalid request";
  return error instanceof Error ? error.message : "Something went wrong";
}
