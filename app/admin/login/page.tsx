// app/admin/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      // on success, redirect to admin dashboard
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-secondary p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-2xl mb-4 text-primary font-light tracking-widest">
          Admin Login
        </h1>

        {error && <div className="text-red-400 mb-3">{error}</div>}

        <label className="block mb-3">
          <span className="text-muted">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-3 rounded-lg bg-black/10"
          />
        </label>

        <label className="block mb-4">
          <span className="text-muted">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-3 rounded-lg bg-black/10"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-foreground py-3 rounded-full"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
