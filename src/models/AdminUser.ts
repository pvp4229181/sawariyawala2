import { Schema, model, models } from "mongoose";
const schema = new Schema(
  {
    email: { type: String, unique: true },
    passwordHash: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);
export const AdminUser = models.AdminUser || model("AdminUser", schema);
