import { Component, signal, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable, forkJoin, map } from 'rxjs';
import { User } from '../../models/user.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpdateUsersComponent } from '../users/update-users/update-users.component';
import { PedidoService } from '../../services/pedido.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { UpdatePedidosComponent } from './update-pedidos/update-pedidos.component';
import { Pedidos } from '../../models/pedidos.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
  providers: [DialogService],
})
export class PedidosComponent implements OnInit {
  isLoading = signal(false);

  orders: any[] = [];
  ref: DynamicDialogRef;
  pedidos$: Observable<any> = this.pedidoService.getPedidos();


  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    private pedidoService: PedidoService,
  ) {}

  showPedido(pedido: Pedidos) {
    this.ref = this.dialogService.open(UpdatePedidosComponent, {
      header: 'Detalles del Pedido',
      width: '40vw',
      height: '50vw',
      modal: true,
      data: { pedido },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }

  ngOnInit(): void {
    this.loadOrders();
    this.pedidos$.subscribe((orders) => {
      console.log('Pedidos', orders);
      console.log('Detalles pedidos:');

      const orderDetailsObservables = orders.map((order) =>
        this.pedidoService.getDetallesPedidosByIdPedido(order.id_pedido)
      );

      forkJoin(orderDetailsObservables).subscribe({
        next: (details: any) => {
          details.forEach((detail, index) => {
            console.log(
              `Detalles del pedido ${orders[index].id_pedido}:`,
              detail
            );
          });

          const userDetailsObservables = orders.map((order) =>
            this.userService.getUserById(order.id_usuario)
          );

          forkJoin(userDetailsObservables).subscribe({
            next: (users: any) => {
              // Enriquecer los pedidos con el nombre_usuario
              const enrichedOrders = orders.map((order, index) => ({
                ...order,
                nombre_usuario: users[index].first_name // Asumiendo que el objeto usuario tiene un campo 'nombre'
              }));

              // Loguear los detalles de los usuarios como antes
              users.forEach((user, index) => {
                console.log(
                  `Detalles del usuario para el pedido ${orders[index].id_pedido}:`,
                  user
                );
              });

              // Opcional: Loguear los pedidos enriquecidos si es necesario
              console.log('Pedidos enriquecidos:', enrichedOrders);
              //this.pedidos$ = enrichedOrders;
            },
          });
        },
      });
    });
  }

  loadOrders() {
    const orders = JSON.parse(localStorage.getItem('pedidos') || '[]');
    this.orders = orders;
  }
}
