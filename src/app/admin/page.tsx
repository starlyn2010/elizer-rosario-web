"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Users, Image, Trash2, LogOut, Loader2, Plus, Vote } from "lucide-react";

interface Publicacion {
  id: string;
  tipo: "foto" | "video";
  url: string;
  descripcion: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [afiliadosCount, setAfiliadosCount] = useState(0);
  const [afiliados, setAfiliados] = useState<any[]>([]);
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [newTipo, setNewTipo] = useState<"foto" | "video">("foto");
  const [newUrl, setNewUrl] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState<"dashboard" | "publicaciones">("dashboard");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
        return;
      }
      setSession(session);
      loadData(session.access_token);
    });
  }, []);

  const loadData = async (token: string) => {
    try {
      const [afiliadosRes, publicacionesRes] = await Promise.all([
        fetch("/api/afiliados", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/publicaciones"),
      ]);

      if (afiliadosRes.ok) {
        const data = await afiliadosRes.json();
        setAfiliadosCount(data.count);
        setAfiliados(data.afiliados || []);
      }
      if (publicacionesRes.ok) {
        const data = await publicacionesRes.json();
        setPublicaciones(data.publicaciones || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const handleCreatePublicacion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    setSubmitting(true);

    const res = await fetch("/api/publicaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session!.access_token}`,
      },
      body: JSON.stringify({ tipo: newTipo, url: newUrl, descripcion: newDesc }),
    });

    if (res.ok) {
      setNewUrl("");
      setNewDesc("");
      loadData(session!.access_token);
    }
    setSubmitting(false);
  };

  const handleDeletePublicacion = async (id: string) => {
    if (!confirm("¿Eliminar esta publicación?")) return;

    await fetch(`/api/publicaciones?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session!.access_token}` },
    });

    loadData(session!.access_token);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-prm" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Vote className="w-6 h-6 text-prm" />
            <span className="font-heading font-bold text-lg text-prm">Admin Panel</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-gray-500 hover:text-red-600 text-sm font-medium transition-colors">
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-8">
          <button onClick={() => setTab("dashboard")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "dashboard" ? "bg-prm text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}>
            Dashboard
          </button>
          <button onClick={() => setTab("publicaciones")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "publicaciones" ? "bg-prm text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}>
            Publicaciones
          </button>
          <a href="/" className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 hover:bg-gray-100" target="_blank">
            Ver Sitio →
          </a>
        </div>

        {tab === "dashboard" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-prm-50 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-prm" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{afiliadosCount}</p>
                <p className="text-sm text-gray-500">Afiliados registrados</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <Image className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{publicaciones.length}</p>
                <p className="text-sm text-gray-500">Publicaciones</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{afiliadosCount}</p>
                <p className="text-sm text-gray-500">Total afiliados</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Últimos Afiliados</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500">
                      <th className="text-left p-4 font-medium">Nombre</th>
                      <th className="text-left p-4 font-medium">Cédula</th>
                      <th className="text-left p-4 font-medium">Email</th>
                      <th className="text-left p-4 font-medium">Teléfono</th>
                      <th className="text-left p-4 font-medium">Recinto</th>
                      <th className="text-left p-4 font-medium">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {afiliados.slice(0, 20).map((a) => (
                      <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">{a.nombre} {a.apellido}</td>
                        <td className="p-4 text-gray-600">{a.cedula}</td>
                        <td className="p-4 text-gray-600">{a.email}</td>
                        <td className="p-4 text-gray-600">{a.telefono}</td>
                        <td className="p-4 text-gray-600">{a.recinto_electoral}</td>
                        <td className="p-4 text-gray-500">{new Date(a.created_at).toLocaleDateString("es-DO")}</td>
                      </tr>
                    ))}
                    {afiliados.length === 0 && (
                      <tr><td colSpan={6} className="p-8 text-center text-gray-400">No hay afiliados aún</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === "publicaciones" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Nueva Publicación</h3>
              <form onSubmit={handleCreatePublicacion} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tipo</label>
                  <select value={newTipo} onChange={(e) => setNewTipo(e.target.value as "foto" | "video")} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-prm outline-none">
                    <option value="foto">Foto</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL (imagen o video)</label>
                  <input type="url" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://..." required className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-prm outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Descripción</label>
                  <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-prm outline-none resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="w-full py-3 bg-prm text-white rounded-xl font-semibold hover:bg-prm-600 transition-all disabled:bg-gray-300 flex items-center justify-center gap-2">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Publicar
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Publicaciones ({publicaciones.length})</h3>
              {publicaciones.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-4">
                  <div className="w-20 h-20 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
                    {p.tipo === "foto" ? (
                      <img src={p.url} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Video</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 truncate">{p.descripcion || "Sin descripción"}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(p.created_at).toLocaleDateString("es-DO")}</p>
                  </div>
                  <button onClick={() => handleDeletePublicacion(p.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {publicaciones.length === 0 && (
                <p className="text-center text-gray-400 py-8">No hay publicaciones</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
