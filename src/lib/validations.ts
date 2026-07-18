import { z } from "zod";

export const afiliadoSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZÃ¡Ã©Ã­Ã³ÃºÃ±ÃÃ‰ÃÃ“ÃšÃ‘\s]+$/, "El nombre solo puede contener letras"),
  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZÃ¡Ã©Ã­Ã³ÃºÃ±ÃÃ‰ÃÃ“ÃšÃ‘\s]+$/, "El apellido solo puede contener letras"),
  cedula: z
    .string()
    .length(11, "La cÃ©dula debe tener exactamente 11 dÃ­gitos")
    .regex(/^\d{11}$/, "La cÃ©dula debe contener solo nÃºmeros (11 dÃ­gitos)"),
  telefono: z
    .string()
    .min(10, "El telÃ©fono debe tener al menos 10 dÃ­gitos")
    .max(15, "El telÃ©fono no puede exceder 15 dÃ­gitos")
    .regex(/^\+?\d{7,15}$/, "NÃºmero de telÃ©fono invÃ¡lido (ej: 8091234567)"),
  email: z
    .string()
    .email("Correo electrÃ³nico invÃ¡lido")
    .optional()
    .or(z.literal("")),
  recinto_electoral: z
    .string()
    .min(1, "Selecciona un recinto electoral"),
});
