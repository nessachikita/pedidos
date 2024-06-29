import { Component, OnInit, signal } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PedidoService } from '../../../services/pedido.service';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, catchError, finalize, map, tap } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-pedidos',
  templateUrl: './update-pedidos.component.html',
  styleUrl: './update-pedidos.component.scss'
})
export class UpdatePedidosComponent implements OnInit{
  isLoading = signal(false);
  ref: DynamicDialogRef;
  data = this.dialogConfig.data;

  estado!: string;
  pedidos$ = this.pedidoService.getDetallesPedidosByIdPedido(this.data.pedido.id_pedido);
  detallesUsuario: any;
  detallesPedido: any;
  pedidoFiltrado$: Observable<any>;
  pedido: any;
  pedidos2$: Observable<any> = this.pedidoService.getPedidos();
  elid: any;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private pedidoService: PedidoService,
    private dialogRef: DynamicDialogRef,
    public messageService: MessageService,
    public dialogService: DialogService,
    private userService: UserService,
    private http: HttpClient
  ) {
     this.estado = '';
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  ngOnInit() {
    this.data = this.dialogConfig.data;
    const idPedido = this.data.pedido.id_pedido;
    const idUsuario = this.data.pedido.id_usuario;

    // Obtener detalles del pedido y del usuario
    this.pedidoService.getDetallesPedidosByIdPedido(idPedido).subscribe((detalles) => {
      console.log(detalles);
      this.detallesPedido = detalles;
      console.log('DetallesPedido', this.detallesPedido);
    });
    this.userService.getUserById(idUsuario).subscribe((usuario) => {
      console.log(usuario);
      this.detallesUsuario = usuario;
    });

    // Filtrar el pedido por idPedido
    this.pedidoFiltrado$ = this.pedidos2$.pipe(
      map(pedidos => pedidos.find(pedido => pedido.id_pedido === idPedido))
    );
    this.elid=idPedido
  }


  // Asumiendo que ya tienes un método para manejar el cambio de estatus
  onChangeStatus(newStatus: string) {
    if (newStatus === 'cancelado') {
      // Llamar a un método del servicio para eliminar el pedido
    } else if (newStatus === 'aprobado') {
      // Llamar a un método del servicio para actualizar el estatus del pedido
    }
  }

  eliminarPedido() {
    this.isLoading.set(true);
    this.pedidoService.deletePedido(this.elid)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError(error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ha ocurrido un error al eliminar el pedido.'
          });
          console.error('Error al eliminar el pedido:', error);
          return EMPTY;
        }),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Pedido eliminado',
            detail: 'El pedido ha sido eliminado exitosamente.'
          });
          setTimeout(() => window.location.reload(), 1000);
        })
      ).subscribe();
  }

  enviarPedido() {
    this.isLoading.set(true);
    const updatedPedido = { estado: 'Completado' };
    this.pedidoService.updatePedidoStatus(this.elid, updatedPedido)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError(error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ha ocurrido un error al actualizar el estado del pedido.'
          });
          console.error('Error al actualizar el pedido:', error);
          return EMPTY;
        }),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Pedido actualizado',
            detail: 'El estado del pedido ha sido actualizado a completado.'
          });
          setTimeout(() => window.location.reload(), 1000);
        })
      ).subscribe();
  }
}
