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
  "Colegio San Martín de Porres",
  "Escuela Básica Sabana Perdida",
  "Liceo Sabana Perdida",
  "Escuela María Auxiliadora",
  "Politécnico San Pablo",
  "Colegio Sagrado Corazón",
  "Escuela Básica Los Rieles",
  "Liceo Juan Pablo Duarte",
  "Escuela Básica Villa Duarte",
  "Colegio San Francisco de Asís",
  "Escuela Básica La Javilla",
  "Liceo Experimental Altagracia",
  "Universidad Autónoma de Santo Domingo (UASD)",
  "Instituto Técnico Salesiano",
  "Escuela Básica Santa María",
  "Politécnico Juan Bosch",
  "Colegio Santo Domingo",
  "Escuela Básica Los Mina",
  "Liceo El Almirante",
  "Escuela Básica La Esperanza",
].sort();
