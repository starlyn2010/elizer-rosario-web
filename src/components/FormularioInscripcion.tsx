"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, AlertCircle, User, Mail, CreditCard, MapPin, Phone, ArrowRight, Shield, Search } from "lucide-react";
import { afiliadoSchema } from "@/lib/validations";
import { RECINTOS_ELECTORALES } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { AfiliadoFormData, AfiliadoResponse } from "@/lib/types";

type FormData = z.infer<typeof afiliadoSchema>;

export default function FormularioInscripcion() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AfiliadoResponse | null>(null);
  const [recintoValue, setRecintoValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(afiliadoSchema),
  });

  const filteredRecintos = RECINTOS_ELECTORALES.filter((r) =>
    r.toLowerCase().includes(recintoValue.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectRecinto = (recinto: string) => {
    setRecintoValue(recinto);
    setValue("recinto_electoral", recinto, { shouldValidate: true });
    setShowDropdown(false);
  };

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
        setResult({ success: true, message: "Â¡Registro exitoso! Bienvenido al movimiento." });
        reset();
        setRecintoValue("");
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
      "hover:border-prm-300",
      "disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60",
      hasError
        ? "border-red-300 hover:border-red-400 focus:border-red-500 focus:ring-red-100"
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
          Â¡Registro Exitoso!
        </h3>
        <p className="text-gray-600 mb-4">{result.message}</p>
        <p className="text-sm text-gray-500 mb-8">Te contactaremos pronto con mÃ¡s informaciÃ³n.</p>
        <button
          onClick={() => { setResult(null); reset(); setRecintoValue(""); }}
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
            CÃ©dula <span className="text-red-500">*</span>
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
            <p className="text-gray-400 text-xs mt-1.5">11 dÃ­gitos, sin guiones</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="telefono" className={labelClass}>
              <Phone className="w-3.5 h-3.5 inline mr-1 text-prm" />
              TelÃ©fono <span className="text-red-500">*</span>
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
              Correo ElectrÃ³nico <span className="text-gray-400 text-xs font-normal">(opcional)</span>
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

        <div className="relative">
          <label className={labelClass}>
            <MapPin className="w-3.5 h-3.5 inline mr-1 text-prm" />
            Recinto Electoral <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Busca tu recinto electoral..."
              value={recintoValue}
              onChange={(e) => {
                setRecintoValue(e.target.value);
                setValue("recinto_electoral", e.target.value, { shouldValidate: false });
                setShowDropdown(true);
              }}
              onFocus={() => { setFocused(true); setShowDropdown(true); }}
              onBlur={() => { setFocused(false); }}
              className={inputClass(!!errors.recinto_electoral) + " pl-10"}
            />
          </div>
          {showDropdown && (
            <div ref={dropdownRef} className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-elevation-3 max-h-48 overflow-y-auto">
              {filteredRecintos.length > 0 ? (
                filteredRecintos.map((recinto) => (
                  <button
                    key={recinto}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); selectRecinto(recinto); }}
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm hover:bg-prm-50 transition-colors border-b border-gray-50 last:border-0",
                      recintoValue === recinto ? "bg-prm-50 text-prm font-medium" : "text-gray-700"
                    )}
                  >
                    {recinto}
                  </button>
                ))
              ) : (
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); selectRecinto("Otro (no listado)"); setShowDropdown(false); }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Otro (no listado)
                </button>
              )}
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); selectRecinto("Otro (no listado)"); setShowDropdown(false); }}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-prm border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                Otro (no listado)
              </button>
            </div>
          )}
          <input type="hidden" {...register("recinto_electoral")} value={recintoValue} />
          {errors.recinto_electoral && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.recinto_electoral.message}</p>
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
          <span>Tus datos estÃ¡n protegidos y nunca serÃ¡n compartidos</span>
        </div>
      </form>
    </div>
  );
}
