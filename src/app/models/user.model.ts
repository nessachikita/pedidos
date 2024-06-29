export interface User{
  Nombre: string;
  Apellido: string;
  Cédula: string
  Correo: string;
  Contraseña?: string;
  username?: string;
  intentos?: number;
  id?: number;
}

export interface UserLogin extends User{
  access:string,
  is_staff?: boolean;
}

export interface UserViewModel extends User {
  is_staff: string; 
}