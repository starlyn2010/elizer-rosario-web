"use client";

import { BookOpen, Users, Heart, Building2, Lightbulb, Handshake } from "lucide-react";

const propuestas = [
  {
    icon: BookOpen,
    title: "Educación de Calidad",
    description:
      "Fortalecer los centros educativos de Sabana Perdida con programas de becas, tutorías y talleres extracurriculares para nuestros jóvenes.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Users,
    title: "Liderazgo Juvenil",
    description:
      "Crear espacios de participación activa para los jóvenes, impulsando su liderazgo y compromiso con la comunidad a través de formación y proyectos.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Heart,
    title: "Desarrollo Comunitario",
    description:
      "Promover programas de desarrollo integral que mejoren la calidad de vida de todas las familias de Sabana Perdida.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: Building2,
    title: "Gestión Municipal Transparente",
    description:
      "Trabajar por una gestión municipal abierta, eficiente y transparente que rinda cuentas a la comunidad.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Lightbulb,
    title: "Innovación y Empleo",
    description:
      "Impulsar programas de capacitación técnica y emprendimiento que generen oportunidades de empleo para los jóvenes de Sabana Perdida.",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    icon: Handshake,
    title: "Participación Ciudadana",
    description:
      "Fomentar mecanismos de participación ciudadana donde cada voz sea escuchada y cada propuesta sea considerada.",
    color: "bg-prm-50 text-prm",
  },
];

export default function Propuestas() {
  return (
    <section id="propuestas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-prm-50 rounded-full text-prm text-sm font-medium mb-6">
            <Lightbulb className="w-4 h-4" />
            Mi Plan de Trabajo
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Propuestas para Sabana Perdida
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ideas claras y acciones concretas para construir el futuro que nuestra comunidad merece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propuestas.map((propuesta, index) => {
            const Icon = propuesta.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-prm-200 transition-all duration-300 hover:shadow-xl hover:shadow-prm/5 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl ${propuesta.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{propuesta.title}</h3>
                <p className="text-gray-600 leading-relaxed">{propuesta.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
