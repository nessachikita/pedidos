import { Component, Renderer2, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { TokenService } from '../../../services/token.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PedidoService } from '../../../services/pedido.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartProducts: any[] = [];
  cartUpdateSubscription: Subscription;

  openSidebar(nav: HTMLElement) {
    this.rederer2.addClass(nav, 'open');
  }

  closeSidebar(nav: HTMLElement) {
    this.rederer2.removeClass(nav, 'open');
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  get totalProducts() {
    return this.cartProducts.reduce((total, product) => total + product.precio, 0);
  }

  buyNow() {
    const token = this.tokenService.getToken();

    if (token) {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();
      const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      const formattedDate = currentTime.toISOString().slice(0, 10);

      const body = {
        estado: "Pendiente",
        fecha: formattedDate,
        hora: formattedTime,
        total: 12,
      };
      this.pedidoService.pedidos(body).subscribe((response) => {
        console.log('Pedido creado', response);
        const idPedido = response.id_pedido;
  
        this.cartProducts.forEach(product => {
          product.toppings.forEach(topping => {
            this.productService.getToppingId(topping.nombre, topping.precio).subscribe(idTopping => {
              const detallePedido = {
                nombre: product.nombre,
                cantidad: product.cantidad,
                subtotal: product.precio, // Ajusta según necesites calcular el subtotal
                id_pedido: idPedido,
                id_producto: product.id_producto,
                id_categoria: product.id_categoria,
                id_topping: idTopping,
                tamano_id: product.tamanos[0].id_tamanos // Asumiendo que solo hay un tamaño por producto
              };
  
              this.pedidoService.detallespedidos(detallePedido).subscribe(response => {
                console.log('Detalle de pedido creado', response);
              });
            });
          });
        });
  
        this.router.navigate(['/pages/sedes']);
      });
      this.router.navigate(['/pages/sedes']);
    } else {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000);
      this.showMessage('error', 'error', 'Debe iniciar sesión para completar la compra. Será redirigido para continuar.');
    }
  }

  constructor(
    private router: Router,
    private messageService: MessageService,
    private tokenService: TokenService,
    private rederer2: Renderer2,
    private pedidoService: PedidoService,
    private productService: ProductsService,
    private cartService: CartService) {}

    ngOnInit() {
      this.updateCartProducts();
      this.cartUpdateSubscription = this.cartService.cartUpdated.subscribe(() => {
        this.updateCartProducts();
      });
      console.log(this.cartProducts)
    }
  updateCartProducts() {
    this.cartProducts = this.cartService.getCart();

  }
  clearCart() {
    this.cartService.clearCart();
  }
  clearCartById(id_producto: number) {
    this.cartService.clearCartById(id_producto);
  }
}
