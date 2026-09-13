import { Schema, model, models } from "mongoose";

const schema = new Schema(
  {
    productSlug: { type: String, required: true, trim: true, index: true },
    productName: { type: String, required: true, trim: true },
    customerName: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      index: true,
    },
  },
  { timestamps: true },
);

export const Review = models.Review || model("Review", schema);
