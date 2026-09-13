import { Schema, model, models } from "mongoose";

const schema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: {
      fullName: String,
      phone: { type: String, index: true },
      email: String,
    },
    address: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      postalCode: String,
      deliveryNotes: String,
    },
    items: [
      {
        productId: Schema.Types.ObjectId,
        name: String,
        slug: String,
        image: String,
        unitPrice: Number,
        quantity: Number,
        lineTotal: Number,
      },
    ],
    subtotal: Number,
    deliveryCharge: Number,
    discount: { type: Number, default: 0 },
    total: Number,
    paymentMethod: { type: String, enum: ["COD", "RAZORPAY"], required: true },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
    },
    orderStatus: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "PREPARING",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
    },
    razorpayOrderId: { type: String, index: true },
    razorpayPaymentId: String,
    razorpaySignature: String,
    notes: String,
    accessTokenHash: String,
    timeline: [{ status: String, at: Date, note: String }],
    processedWebhookEvents: [String],
  },
  { timestamps: true },
);
export const Order = models.Order || model("Order", schema);
