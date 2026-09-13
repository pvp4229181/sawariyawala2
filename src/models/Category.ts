import { Schema, model, models } from "mongoose";
const schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sortOrder: Number,
    active: Boolean,
  },
  { timestamps: true },
);
export const Category = models.Category || model("Category", schema);
