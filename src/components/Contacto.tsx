"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Send, Loader2, CheckCircle } from "lucide-react";

export default function Contacto() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simular envío
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Contáctame
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ¿Tienes preguntas, sugerencias o quieres sumarte al movimiento? 
            Estoy aquí para escucharte.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-prm-50 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-prm" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Teléfono / WhatsApp</h3>
                <p className="text-gray-600">(809) 000-0000</p>
                <a
                  href="https://wa.me/18090000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-prm text-sm font-medium hover:underline mt-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  Escríbeme por WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-prm-50 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-prm" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Correo Electrónico</h3>
                <p className="text-gray-600">info@elizerrosario.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-prm-50 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-prm" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Ubicación</h3>
                <p className="text-gray-600">Sabana Perdida, Santo Domingo, RD</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <a
                href="#inscripcion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-yellow-400 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                Quiero ser Voluntario
              </a>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="text-center py-16 px-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
                <p className="text-gray-600">Gracias por contactarme. Te responderé pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-prm focus:ring-4 focus:ring-prm/10 outline-none transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Tu correo"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-prm focus:ring-4 focus:ring-prm/10 outline-none transition-all"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Asunto"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-prm focus:ring-4 focus:ring-prm/10 outline-none transition-all"
                />
                <textarea
                  rows={5}
                  placeholder="Tu mensaje..."
                  required
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-prm focus:ring-4 focus:ring-prm/10 outline-none transition-all resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-prm text-white rounded-xl font-bold hover:bg-prm-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-prm/25"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
