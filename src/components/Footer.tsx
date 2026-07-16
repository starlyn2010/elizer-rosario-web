import { Vote, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Vote className="w-6 h-6 text-secondary" />
              <span className="font-heading font-bold text-lg">Elizer Rosario</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Candidato a Regidor por el PRM en Sabana Perdida. Trabajando por una nueva generación de funcionarios que sirvan a la comunidad.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-prm rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-prm rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-prm rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4 text-sm uppercase tracking-wider text-gray-300">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              {["Biografía", "Propuestas", "Galería", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-secondary text-sm transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4 text-sm uppercase tracking-wider text-gray-300">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                Sabana Perdida, Santo Domingo, RD
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                (809) 000-0000
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                info@elizerrosario.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4 text-sm uppercase tracking-wider text-gray-300">
              Inscripción
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Únete a nuestro movimiento. Juntos podemos construir el cambio que Sabana Perdida necesita.
            </p>
            <a
              href="#inscripcion"
              className="inline-flex items-center px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm hover:bg-yellow-400 transition-all"
            >
              Inscríbete Ahora
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Elizer Rosario Torres. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-sm">
              Organización Política: PRM | Sabana Perdida, Santo Domingo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
