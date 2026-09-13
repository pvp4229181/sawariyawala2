import { Schema, model, models } from "mongoose";
const schema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
    status: { type: String, enum: ["NEW", "READ", "ARCHIVED"], default: "NEW" },
  },
  { timestamps: true },
);
export const ContactMessage =
  models.ContactMessage || model("ContactMessage", schema);
