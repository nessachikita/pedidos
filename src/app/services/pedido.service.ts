import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private storageKey = 'carrito';
  private apiPedido: string = environment.apiPedidos;
  private apiDetalles: string = environment.apiDetalles;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  detallespedidos(body): Observable<any> {
    return this.http.post(`${this.apiDetalles}`, body);
  }

  deletePedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiPedido}/${id}/`);
  }

  updatePedidoStatus(id: number, estado): Observable<any> {
    return this.http.patch(`${this.apiPedido}/${id}/`, estado );
  }

  getPedidos(): Observable<any> {
    return this.http.get(`${this.apiPedido}`);
  }
  getDetallesPedidos(){
    return this.http.get(`${this.apiDetalles}`);
  }
  getDetallesPedidosByIdPedido(id: number){
    return this.http.get(`${this.apiDetalles}/por-pedido/${id}/`);
  }

  pedidos(body): Observable<any> {
    const getUser = this.tokenService.getUserIdFromToken();
    console.log(this.pedidos);
    const carritoJSON = localStorage.getItem(this.storageKey);
    let totalPrecio = 0;
    if (carritoJSON) {
      let carrito = JSON.parse(carritoJSON);
      totalPrecio = carrito.reduce(
        (total, producto) => total + producto.precio,
        0
      );
    }
    return this.http.post(`${this.apiPedido}`, {
      ...body,
      id_usuario: getUser.id_user,
      total: totalPrecio,
    });
  }
}
