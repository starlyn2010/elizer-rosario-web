import Link from "next/link";
import { ArrowLeft, Vote } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <Vote className="w-16 h-16 text-prm mx-auto mb-6" />
        <h1 className="font-heading text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Página no encontrada
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-prm text-white rounded-xl font-semibold hover:bg-prm-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
