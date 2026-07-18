"use client";

import { useEffect, useState } from "react";
import { ImageIcon, Heart, MessageCircle, Send, Loader2 } from "lucide-react";

interface Publicacion {
  id: string;
  tipo: string;
  url: string;
  descripcion: string | null;
  created_at: string;
}

interface Comentario {
  id: string;
  publicacion_id: string;
  nombre: string;
  texto: string;
  created_at: string;
}

interface LikeData {
  likes: { id: string; nombre: string }[];
  count: number;
}

export default function Galeria() {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [comentarios, setComentarios] = useState<Record<string, Comentario[]>>({});
  const [likesData, setLikesData] = useState<Record<string, LikeData>>({});
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentForms, setCommentForms] = useState<Record<string, { nombre: string; texto: string }>>({});
  const [sending, setSending] = useState<Record<string, boolean>>({});
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("/api/publicaciones")
      .then((r) => r.json())
      .then((data) => {
        setPublicaciones(data.publicaciones || []);
        const pids = (data.publicaciones || []).map((p: Publicacion) => p.id);
        pids.forEach((id: string) => {
          fetch(`/api/comentarios?publicacion_id=${id}`).then((r) => r.json()).then((d) => setComentarios((prev) => ({ ...prev, [id]: d.comentarios || [] })));
          fetch(`/api/likes?publicacion_id=${id}`).then((r) => r.json()).then((d) => setLikesData((prev) => ({ ...prev, [id]: d })));
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleLike = async (publicacion_id: string) => {
    if (!userName.trim()) return;
    const res = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicacion_id, nombre: userName.trim() }),
    });
    const data = await res.json();
    if (res.ok) {
      fetch(`/api/likes?publicacion_id=${publicacion_id}`).then((r) => r.json()).then((d) => setLikesData((prev) => ({ ...prev, [publicacion_id]: d })));
    }
  };

  const sendComment = async (publicacion_id: string) => {
    const form = commentForms[publicacion_id];
    if (!form?.nombre?.trim() || !form?.texto?.trim()) return;
    setSending((prev) => ({ ...prev, [publicacion_id]: true }));
    const res = await fetch("/api/comentarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicacion_id, nombre: form.nombre.trim(), texto: form.texto.trim() }),
    });
    if (res.ok) {
      const data = await res.json();
      setComentarios((prev) => ({ ...prev, [publicacion_id]: [...(prev[publicacion_id] || []), data.comentario] }));
      setCommentForms((prev) => ({ ...prev, [publicacion_id]: { nombre: prev[publicacion_id]?.nombre || "", texto: "" } }));
    }
    setSending((prev) => ({ ...prev, [publicacion_id]: false }));
  };

  const toggleComments = (id: string) => setOpenComments((prev) => ({ ...prev, [id]: !prev[id] }));

  const updateCommentField = (id: string, field: "nombre" | "texto", value: string) => {
    setCommentForms((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value, nombre: prev[id]?.nombre || userName || "" } }));
    if (field === "nombre") setUserName(value);
  };

  if (loading) {
    return (
      <section id="galeria" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-prm mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section id="galeria" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Galería</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Momentos que reflejan nuestro compromiso con la comunidad.</p>
        </div>

        {publicaciones.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{ title: "Trabajo Comunitario", desc: "Jornada de limpieza y embellecimiento" }, { title: "Encuentro Juvenil", desc: "Taller de liderazgo con jóvenes" }, { title: "Reunión Vecinal", desc: "Escuchando las necesidades del barrio" }, { title: "Actividad Educativa", desc: "Apoyo escolar en Sabana Perdida" }, { title: "Evento Deportivo", desc: "Promoviendo el deporte y la sana convivencia" }, { title: "Asamblea Comunitaria", desc: "Planificación participativa" }].map((item, index) => (
              <div key={index} className="group relative aspect-video bg-gradient-to-br from-prm-100 to-prm-50 rounded-2xl overflow-hidden cursor-pointer animate-stagger-fade" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-prm-400 group-hover:scale-105 transition-transform duration-300">
                  <ImageIcon className="w-12 h-12 mb-3" />
                  <p className="text-sm font-medium text-prm-600">{item.title}</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 will-change-transform">
                  <p className="text-white font-semibold">{item.title}</p>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicaciones.map((pub) => {
              const likes = likesData[pub.id];
              const comments = comentarios[pub.id] || [];
              const hasLiked = likes?.likes?.some((l) => l.nombre === (commentForms[pub.id]?.nombre || userName));
              return (
                <div key={pub.id} className="bg-white rounded-2xl overflow-hidden shadow-elevation-2 border border-gray-100 animate-stagger-fade">
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    {pub.tipo === "foto" ? (
                      <img src={pub.url} alt={pub.descripcion || ""} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" onError={(e) => { (e.target as HTMLImageElement).src = ""; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Video</div>
                    )}
                  </div>
                  <div className="p-5">
                    {pub.descripcion && <p className="text-sm text-gray-700 mb-4 leading-relaxed">{pub.descripcion}</p>}
                    <div className="flex items-center gap-4 mb-4">
                      <button onClick={() => toggleLike(pub.id)} className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-200 active:scale-90 ${hasLiked ? "text-red-500" : "text-gray-500 hover:text-red-400"}`} title={!userName.trim() ? "Escribe tu nombre arriba para interactuar" : ""}>
                        <Heart className={`w-5 h-5 ${hasLiked ? "fill-red-500" : ""}`} />
                        <span>{likes?.count || 0}</span>
                      </button>
                      <button onClick={() => toggleComments(pub.id)} className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-prm transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>{comments.length}</span>
                      </button>
                    </div>
                    {openComments[pub.id] && (
                      <div className="border-t border-gray-100 pt-4 space-y-3">
                        {comments.length === 0 && <p className="text-xs text-gray-400 text-center">Sin comentarios aún. ¡Sé el primero!</p>}
                        {comments.map((c) => (
                          <div key={c.id} className="bg-gray-50 rounded-xl p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-prm">{c.nombre}</span>
                              <span className="text-[10px] text-gray-400">{new Date(c.created_at).toLocaleDateString("es-DO", { day: "numeric", month: "short" })}</span>
                            </div>
                            <p className="text-sm text-gray-700">{c.texto}</p>
                          </div>
                        ))}
                        <div className="space-y-2 pt-2">
                          <input type="text" placeholder="Tu nombre" value={commentForms[pub.id]?.nombre || userName} onChange={(e) => updateCommentField(pub.id, "nombre", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-prm focus:ring-2 focus:ring-prm/10 transition-all" maxLength={50} />
                          <div className="flex gap-2">
                            <input type="text" placeholder="Escribe un comentario..." value={commentForms[pub.id]?.texto || ""} onChange={(e) => updateCommentField(pub.id, "texto", e.target.value)} className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-prm focus:ring-2 focus:ring-prm/10 transition-all" maxLength={200} onKeyDown={(e) => { if (e.key === "Enter") sendComment(pub.id); }} />
                            <button onClick={() => sendComment(pub.id)} disabled={sending[pub.id] || !commentForms[pub.id]?.texto?.trim() || !(commentForms[pub.id]?.nombre || userName)?.trim()} className="px-3 py-2 bg-prm text-white rounded-xl font-medium text-sm hover:bg-prm-600 active:scale-95 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:active:scale-100">
                              {sending[pub.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
