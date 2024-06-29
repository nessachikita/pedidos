import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DessertPageRoutingModule } from './sno-desserts-routing.module';
import { DessertsPageComponent } from './sno-desserts-page.component';
import { SharedModule } from '../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';



@NgModule({
  declarations: [
    DessertsPageComponent
  ],
  imports: [
    CommonModule,
    DessertPageRoutingModule,
    SharedModule,
    ButtonModule,
    CardModule,
    DynamicDialogModule,
  ]
})
export class DessertsPageModule { }
