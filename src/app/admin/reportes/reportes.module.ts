import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesRoutingModule } from './reportes-routing.module';
import { CardModule } from 'primeng/card';
import { SharedModule } from '../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { ReportesComponent } from './reportes.component';



@NgModule({
  declarations: [ReportesComponent],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    CardModule,
    SharedModule,
    ButtonModule,
  ]
})
export class ReportesModule { }
