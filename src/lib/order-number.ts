import crypto from "node:crypto";
export const createOrderNumber = () =>
  `SW-${new Date().toISOString().slice(2, 10).replaceAll("-", "")}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
