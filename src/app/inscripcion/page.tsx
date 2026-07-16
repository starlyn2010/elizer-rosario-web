import { ClipboardCheck, Users, ArrowRight, Shield } from "lucide-react";
import FormularioInscripcion from "@/components/FormularioInscripcion";

export default function InscripcionPage() {
  return (
    <section id="inscripcion" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-prm-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ClipboardCheck className="w-8 h-8 text-prm" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Inscríbete en el Movimiento
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Únete a nuestra causa. Juntos podemos construir el cambio que 
            Sabana Perdida necesita. Completa el formulario y sé parte de esta nueva generación.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Datos protegidos</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-prm" />
              <span>+100 inscritos</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ArrowRight className="w-4 h-4 text-secondary" />
              <span>Sin compromiso</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 lg:p-12 max-w-3xl mx-auto">
          <FormularioInscripcion />
        </div>
      </div>
    </section>
  );
}
