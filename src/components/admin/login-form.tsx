"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function LoginForm() {
  const router = useRouter(),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const f = new FormData(e.currentTarget),
      r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: f.get("email"),
          password: f.get("password"),
        }),
      }),
      d = await r.json();
    if (!r.ok) {
      setError(d.error);
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }
  return (
    <form className="admin-login-form" onSubmit={submit}>
      <span className="eyebrow">Private access</span>
      <h1>Admin login</h1>
      <label>
        Email
        <input required type="email" name="email" />
      </label>
      <label>
        Password
        <input required minLength={8} type="password" name="password" />
      </label>
      <button className="button full" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
