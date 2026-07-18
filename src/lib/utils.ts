import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("es-DO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export const RECINTOS_ELECTORALES = [
  "Colegio San MartÃ­n de Porres",
  "Escuela BÃ¡sica Sabana Perdida",
  "Liceo Sabana Perdida",
  "Escuela MarÃ­a Auxiliadora",
  "PolitÃ©cnico San Pablo",
  "Escuela BÃ¡sica Los Rieles",
  "Liceo Juan Pablo Duarte",
  "Escuela BÃ¡sica Villa Duarte",
  "Escuela BÃ¡sica La Javilla",
  "Liceo Experimental Altagracia",
  "Instituto TÃ©cnico Salesiano",
  "Escuela BÃ¡sica Santa MarÃ­a",
  "PolitÃ©cnico Juan Bosch",
  "Liceo El Almirante",
  "Escuela BÃ¡sica La Esperanza",
  "Colegio Santo Domingo (Sabana Perdida)",
].sort();
