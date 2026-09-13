import { Schema, model, models } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: String,
    description: String,
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: Number,
    image: String,
    gallery: [String],
    ingredients: [String],
    tags: [String],
    badges: [String],
    vegetarian: { type: Boolean, default: true },
    featured: Boolean,
    bestseller: Boolean,
    inStock: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);
export const Product = models.Product || model("Product", schema);
