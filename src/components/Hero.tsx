"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, Users, Target, Heart } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      containerRef.current.style.setProperty("--mouse-x", String(x));
      containerRef.current.style.setProperty("--mouse-y", String(y));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div
        ref={containerRef}
        className="absolute inset-0 bg-gradient-to-br from-prm via-prm-700 to-prm-900"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-prm-300 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-prm-500 rounded-full blur-3xl opacity-50" />
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(255, 215, 0, 0.3) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6 border border-white/10">
              <Heart className="w-4 h-4 text-secondary" />
              Candidato a Regidor por el PRM
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
              <span className="block">Elizer</span>
              <span className="block text-secondary">Rosario Torres</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
              Una nueva generación de funcionarios que trabajen por y para la comunidad. 
              Docente, líder comunitario y servidor público comprometido con Sabana Perdida.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#inscripcion"
                className="inline-flex items-center px-8 py-3.5 bg-secondary text-secondary-foreground rounded-xl font-bold text-base hover:bg-yellow-400 transition-all duration-200 shadow-xl shadow-yellow-500/30 hover:shadow-yellow-500/40 hover:-translate-y-0.5"
              >
                <Users className="w-5 h-5 mr-2" />
                Únete al Movimiento
              </a>
              <a
                href="#propuestas"
                className="inline-flex items-center px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-base border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                <Target className="w-5 h-5 mr-2" />
                Conoce mis Propuestas
              </a>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="w-80 h-80 xl:w-96 xl:h-96 rounded-full bg-gradient-to-br from-prm-400 to-prm-800 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-prm-900 flex items-center justify-center overflow-hidden border-4 border-white/20">
                  <div className="text-center p-8">
                    <Vote className="w-16 h-16 text-secondary mx-auto mb-4" />
                    <p className="text-white font-heading text-2xl font-bold">PRM</p>
                    <p className="text-white/60 text-sm mt-2">Partido Revolucionario Moderno</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl shadow-xl">
                <p className="font-bold text-lg">#ElCambio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#biografia"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}

function Vote(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
