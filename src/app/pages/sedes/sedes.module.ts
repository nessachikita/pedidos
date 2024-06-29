import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SedesRoutingModule } from './sedes-routing.module';
import { SedesComponent } from './sedes.component';
import { SharedModule } from '../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [
    SedesComponent
  ],
  imports: [
    CommonModule,
    SedesRoutingModule,
    SharedModule,
    ButtonModule,
    CardModule,
  ]
})
export class SedesModule { }
