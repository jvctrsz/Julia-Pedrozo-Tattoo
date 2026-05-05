"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      setError("Senha incorreta.");
      setLoading(false);
    }
  };

  return (
    <main
      id="login-content"
      className="min-h-screen bg-black flex items-center justify-center px-4"
    >
      <div className="w-full max-w-sm">
        <header className="mb-12 text-center">
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">
            Julia Pedrozo
          </p>
          <h1
            className="text-white text-4xl"
            style={{ fontFamily: "'Didot', serif" }}
          >
            Admin
          </h1>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white/40 text-xs uppercase tracking-widest mb-3"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full bg-transparent border border-white/20 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/60 transition-colors"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="text-red-400 text-xs uppercase tracking-widest mb-6"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/60 px-6 py-3 text-xs uppercase tracking-widest transition-all disabled:opacity-40 cursor-pointer"
          >
            {loading ? "Entrando…" : "Entrar"}
            {!loading && <ArrowRightIcon className="size-4" />}
          </button>
        </form>
      </div>
    </main>
  );
}
