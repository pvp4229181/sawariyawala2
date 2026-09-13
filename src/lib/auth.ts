import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const COOKIE = "sw_admin";
const maxAge = 60 * 60 * 8;
const secret = () => process.env.AUTH_SECRET || "";

function sign(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}
export async function verifyAdminCredentials(email: string, password: string) {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH || !secret())
    return false;
  return (
    email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase() &&
    bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
  );
}
export async function createAdminSession() {
  const expires = Date.now() + maxAge * 1000;
  const payload = `${expires}`;
  const jar = await cookies();
  jar.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}
export async function clearAdminSession() {
  (await cookies()).delete(COOKIE);
}
export async function isAdmin() {
  if (!secret()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = sign(expires);
  return (
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  );
}
