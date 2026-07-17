"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Vote, Loader2, LogIn, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await (supabase.auth as any).signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message === "Invalid login credentials"
        ? "Credenciales inválidas"
        : error.message
      );
      setLoading(false);
      return;
    }

    if (data.session) {
      localStorage.setItem("admin_token", data.session.access_token);
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-prm via-prm-700 to-prm-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Vote className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold text-white">Admin</h1>
          <p className="text-white/60 mt-1">Elizer Rosario Torres</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 shadow-2xl space-y-5">
          <h2 className="text-xl font-bold text-gray-900 text-center">Iniciar Sesión</h2>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@elizerrosario.com"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-prm focus:ring-4 focus:ring-prm/10 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-prm focus:ring-4 focus:ring-prm/10 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-prm text-white rounded-xl font-bold hover:bg-prm-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Entrando...</>
            ) : (
              <><LogIn className="w-5 h-5" /> Entrar</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
