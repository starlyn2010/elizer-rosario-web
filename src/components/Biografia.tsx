"use client";

import { GraduationCap, BookOpen, Users, Church, MapPin, Calendar } from "lucide-react";

const timeline = [
  {
    year: "Nacimiento",
    title: "Nagua, República Dominicana",
    description: "Nacido en Nagua, provincia María Trinidad Sánchez.",
    icon: MapPin,
  },
  {
    year: "2001",
    title: "Inmigración a Santo Domingo",
    description: "Se traslada a Santo Domingo en busca de nuevas oportunidades.",
    icon: Calendar,
  },
  {
    year: "Licenciatura",
    title: "Licenciado en Idiomas",
    description: "Graduado con honores, especializado en la enseñanza de idiomas.",
    icon: GraduationCap,
  },
  {
    year: "Maestría",
    title: "Planificación Educativa",
    description: "Maestría que fortaleció su visión estratégica de la educación.",
    icon: BookOpen,
  },
  {
    year: "12 años",
    title: "Docente",
    description: "Más de una década formando jóvenes en las aulas dominicanas.",
    icon: BookOpen,
  },
  {
    year: "6 años",
    title: "Técnico Docente",
    description: "Apoyando la gestión educativa desde la técnica y la planificación.",
    icon: GraduationCap,
  },
  {
    year: "2023",
    title: "Trabajo Comunitario",
    description: "Impulsa el liderazgo juvenil en Sabana Perdida.",
    icon: Users,
  },
  {
    year: "Actualidad",
    title: "Iglesia Templo Bíblico",
    description: "Miembro activo con destacada participación en la comunidad cristiana.",
    icon: Church,
  },
];

export default function Biografia() {
  return (
    <section id="biografia" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Mi Trayectoria
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Una vida dedicada a la educación, la comunidad y el servicio. 
            Conoce el camino que me ha traído hasta aquí.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-prm-200 hidden lg:block" />

          <div className="space-y-8 lg:space-y-12">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col lg:flex-row items-center gap-6 lg:gap-0 ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="hidden lg:flex lg:w-1/2 justify-center">
                    <div
                      className={`max-w-md ${
                        isLeft ? "lg:text-right lg:pr-12" : "lg:text-left lg:pl-12"
                      }`}
                    >
                      <div className="inline-block px-3 py-1 bg-prm text-white text-xs font-bold rounded-full mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  <div className="hidden lg:flex relative z-10 shrink-0">
                    <div className="w-12 h-12 rounded-full bg-prm border-4 border-white shadow-md flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="lg:hidden w-full">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-prm flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-prm uppercase">{item.year}</span>
                          <h3 className="font-bold text-gray-900">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm ml-13">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap gap-4 justify-center">
            <div className="px-6 py-4 bg-white rounded-2xl shadow-md border border-gray-100">
              <p className="text-3xl font-bold text-prm">12+</p>
              <p className="text-sm text-gray-600">Años como Docente</p>
            </div>
            <div className="px-6 py-4 bg-white rounded-2xl shadow-md border border-gray-100">
              <p className="text-3xl font-bold text-prm">6+</p>
              <p className="text-sm text-gray-600">Años como Técnico Docente</p>
            </div>
            <div className="px-6 py-4 bg-white rounded-2xl shadow-md border border-gray-100">
              <p className="text-3xl font-bold text-prm">2</p>
              <p className="text-sm text-gray-600">Títulos Universitarios</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
