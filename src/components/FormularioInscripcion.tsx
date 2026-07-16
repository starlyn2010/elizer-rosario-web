"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, AlertCircle, User, Mail, CreditCard, MapPin, Phone, ArrowRight, Shield } from "lucide-react";
import { afiliadoSchema } from "@/lib/validations";
import { RECINTOS_ELECTORALES } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { AfiliadoFormData, AfiliadoResponse } from "@/lib/types";

type FormData = z.infer<typeof afiliadoSchema>;

export default function FormularioInscripcion() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AfiliadoResponse | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(afiliadoSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/inscripcion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resultData: AfiliadoResponse = await response.json();

      if (resultData.success) {
        setResult({ success: true, message: "¡Registro exitoso! Bienvenido al movimiento." });
        reset();
      } else {
        setResult({ success: false, message: resultData.message });
      }
    } catch {
      setResult({
        success: false,
        message: "Error al enviar el formulario. Intenta de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full px-4 py-3.5 rounded-xl border-2 bg-white text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none",
      "focus:ring-4 focus:ring-prm/10",
      hasError
        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
        : "border-gray-200 focus:border-prm"
    );

  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  if (result?.success) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 px-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3">
          ¡Registro Exitoso!
        </h3>
        <p className="text-gray-600 mb-4">{result.message}</p>
        <p className="text-sm text-gray-500 mb-8">Te contactaremos pronto con más información.</p>
        <button
          onClick={() => { setResult(null); reset(); }}
          className="px-6 py-3 bg-prm text-white rounded-xl font-semibold hover:bg-prm-600 transition-colors"
        >
          Registrar a Otra Persona
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {result && !result.success && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{result.message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="nombre" className={labelClass}>
              <User className="w-3.5 h-3.5 inline mr-1 text-prm" />
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              {...register("nombre")}
              className={inputClass(!!errors.nombre)}
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="apellido" className={labelClass}>
              <User className="w-3.5 h-3.5 inline mr-1 text-prm" />
              Apellido <span className="text-red-500">*</span>
            </label>
            <input
              id="apellido"
              type="text"
              placeholder="Tu apellido"
              {...register("apellido")}
              className={inputClass(!!errors.apellido)}
            />
            {errors.apellido && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.apellido.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="cedula" className={labelClass}>
            <CreditCard className="w-3.5 h-3.5 inline mr-1 text-prm" />
            Cédula <span className="text-red-500">*</span>
          </label>
          <input
            id="cedula"
            type="text"
            placeholder="00000000000"
            maxLength={11}
            {...register("cedula")}
            className={inputClass(!!errors.cedula)}
          />
          {errors.cedula ? (
            <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.cedula.message}</p>
          ) : (
            <p className="text-gray-400 text-xs mt-1.5">11 dígitos, sin guiones</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="telefono" className={labelClass}>
              <Phone className="w-3.5 h-3.5 inline mr-1 text-prm" />
              Teléfono <span className="text-red-500">*</span>
            </label>
            <input
              id="telefono"
              type="tel"
              placeholder="8091234567"
              {...register("telefono")}
              className={inputClass(!!errors.telefono)}
            />
            {errors.telefono && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.telefono.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              <Mail className="w-3.5 h-3.5 inline mr-1 text-prm" />
              Correo Electrónico <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              {...register("email")}
              className={inputClass(!!errors.email)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="recinto_electoral" className={labelClass}>
            <MapPin className="w-3.5 h-3.5 inline mr-1 text-prm" />
            Recinto Electoral <span className="text-red-500">*</span>
          </label>
          <select
            id="recinto_electoral"
            {...register("recinto_electoral")}
            className={inputClass(!!errors.recinto_electoral)}
          >
            <option value="">Selecciona tu recinto electoral</option>
            {RECINTOS_ELECTORALES.map((recinto) => (
              <option key={recinto} value={recinto}>
                {recinto}
              </option>
            ))}
            <option value="otro">Otro (no listado)</option>
          </select>
          {errors.recinto_electoral && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">
              {errors.recinto_electoral.message}
            </p>
          )}
        </div>

        <div className="hidden" aria-hidden="true">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-200",
              "flex items-center justify-center gap-2",
              isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-prm text-white hover:bg-prm-600 active:scale-[0.99] shadow-lg shadow-prm/25"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Registrando...
              </>
            ) : (
              <>
                Completar Registro
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
          <Shield className="w-3.5 h-3.5" />
          <span>Tus datos están protegidos y nunca serán compartidos</span>
        </div>
      </form>
    </div>
  );
}
