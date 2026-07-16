import { z } from "zod";

export const afiliadoSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/, "El nombre solo puede contener letras"),
  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/, "El apellido solo puede contener letras"),
  cedula: z
    .string()
    .length(11, "La cédula debe tener exactamente 11 dígitos")
    .regex(/^\d{11}$/, "La cédula debe contener solo números (11 dígitos)"),
  telefono: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .max(15, "El teléfono no puede exceder 15 dígitos")
    .regex(/^\+?\d{7,15}$/, "Número de teléfono inválido (ej: 8091234567)"),
  email: z
    .string()
    .email("Correo electrónico inválido")
    .min(5, "El correo es requerido"),
  recinto_electoral: z
    .string()
    .min(1, "Selecciona un recinto electoral"),
});
