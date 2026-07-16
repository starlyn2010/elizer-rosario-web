export interface AfiliadoFormData {
  nombre: string;
  apellido: string;
  cedula: string;
  telefono: string;
  email: string;
  recinto_electoral: string;
}

export interface AfiliadoResponse {
  success: boolean;
  message: string;
}
