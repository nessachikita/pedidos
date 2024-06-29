import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { SettingsComponent } from './settings/settings.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CardModule } from 'primeng/card';
import { PedidosComponent } from './pedidos/pedidos.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ButtonModule,
    CardModule,

   ]
})
export class AdminModule { }
