"use client";

import { ImageIcon } from "lucide-react";

const placeholders = [
  { title: "Trabajo Comunitario", desc: "Jornada de limpieza y embellecimiento" },
  { title: "Encuentro Juvenil", desc: "Taller de liderazgo con jóvenes" },
  { title: "Reunión Vecinal", desc: "Escuchando las necesidades del barrio" },
  { title: "Actividad Educativa", desc: "Apoyo escolar en Sabana Perdida" },
  { title: "Evento Deportivo", desc: "Promoviendo el deporte y la sana convivencia" },
  { title: "Asamblea Comunitaria", desc: "Planificación participativa" },
];

export default function Galeria() {
  return (
    <section id="galeria" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Galería
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Momentos que reflejan nuestro compromiso con la comunidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholders.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] bg-gradient-to-br from-prm-100 to-prm-50 rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-prm-400 group-hover:scale-105 transition-transform duration-300">
                <ImageIcon className="w-12 h-12 mb-3" />
                <p className="text-sm font-medium text-prm-600">{item.title}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-semibold">{item.title}</p>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
