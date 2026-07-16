"use client";

import { useState, useEffect } from "react";
import { Menu, X, Vote, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Inicio", href: "#hero" },
  { label: "Biografía", href: "#biografia" },
  { label: "Propuestas", href: "#propuestas" },
  { label: "Inscripción", href: "#inscripcion" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#hero" className="flex items-center gap-2">
            <Vote className={cn(
              "w-7 h-7 transition-colors",
              scrolled ? "text-prm" : "text-white"
            )} />
            <span className={cn(
              "font-heading font-bold text-lg transition-colors",
              scrolled ? "text-prm" : "text-white"
            )}>
              Elizer Rosario
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  scrolled
                    ? "text-gray-700 hover:text-prm hover:bg-prm-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#inscripcion"
              className="ml-4 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm hover:bg-yellow-400 transition-all duration-200 shadow-lg shadow-yellow-500/25"
            >
              Inscríbete Ahora
            </a>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-gray-700" : "text-white"
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-prm hover:bg-prm-50 rounded-lg font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#inscripcion"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold text-center mt-2"
            >
              Inscríbete Ahora
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
