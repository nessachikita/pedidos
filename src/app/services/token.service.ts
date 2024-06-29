
import { Injectable } from '@angular/core';
import  { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserIdFromToken(): { nombre: string; apellido: string; is_staff: boolean; id_user: number } | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      const decodedToken = jwtDecode(token) as { nombre: string; apellido: string; is_staff: boolean; user_id:number };
      return { nombre: decodedToken.nombre, apellido: decodedToken.apellido, is_staff: decodedToken.is_staff, id_user: decodedToken.user_id };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
