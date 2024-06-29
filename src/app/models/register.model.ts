export interface UserRegister{
  first_name: string,
  last_name: string,
  email: string,
  username: string,
  password: string,
  direccion: string,
  numeroTelefono: string,
}

export interface Userr extends Partial<UserRegister> {
  is_superuser?: boolean,
  is_active?: boolean,
  is_staff?: boolean,
  intentos?: number,
}
