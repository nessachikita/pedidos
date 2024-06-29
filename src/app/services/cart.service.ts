import { Injectable } from "@angular/core";
import { Product } from "../models/products.model";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})

export class CartService {
  carrito: Product[] = [];
  private storageKey = 'carrito';

  cartUpdated = new Subject<void>();
  addToCart(product: Product) {

    const carrito = this.getCart();
    this.carrito.push(product);
    carrito.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(carrito));
    this.cartUpdated.next();
  }


  getCart(){
    const carritoJSON = localStorage.getItem(this.storageKey);
    if (carritoJSON) {
      return JSON.parse(carritoJSON);
    }
    return [];
  }

  clearCart(){
    this.carrito = [];
    localStorage.setItem(this.storageKey, JSON.stringify([]));
    this.cartUpdated.next();
  }

  clearCartById(index: number){
    const carrito = this.getCart();

    if(index >= 0 && index < carrito.length) {
      carrito.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(carrito));
      this.cartUpdated.next();
    }
  }

  exportCart() {
    const carrito = this.getCart();
    const dataStr = JSON.stringify(carrito);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    return dataStr;
  }

  exportCartToWhatsApp(phoneNumber: string) {
    const carrito = this.getCart();
    let resumen = 'Resumen del Carrito:\n';
    let total = 0;

    carrito.forEach((item, index) => {
      const itemTotal = item.precio;
      total += itemTotal;
      resumen += `${index + 1}. ${item.nombre} - Cantidad: ${item.cantidad}, Precio: $${item.precio/item.cantidad}, Tamaño: ${item.tamanos[0].nombre}, Topping: ${item.toppings[0].nombre}, Total: $${itemTotal}\n`;
    });

    resumen += `\nTotal a Pagar: $${total}`;


    if (encodeURIComponent(resumen).length > 2000) {
      alert('El resumen del carrito es demasiado largo para enviarlo por WhatsApp. Por favor, envíalo en partes.');
    } else {
      const whatsappUrl = `https://wa.me/58${phoneNumber}?text=${encodeURIComponent(resumen)}`;
      window.open(whatsappUrl, '_blank');
    }
  }

}
