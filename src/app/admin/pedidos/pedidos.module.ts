import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { UpdatePedidosComponent } from './update-pedidos/update-pedidos.component';
import { DividerModule } from 'primeng/divider';



@NgModule({
  declarations: [PedidosComponent, UpdatePedidosComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    TagModule,
    BadgeModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    DividerModule,
  ]
})
export class PedidosModule { }
