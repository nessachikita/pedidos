import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinksPageRoutingModule } from './sno-drinks-routing.module';
import { DrinksPageComponent } from './sno-drinks-page.component';
import { SharedModule } from '../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';



@NgModule({
  declarations: [
    DrinksPageComponent
  ],
  imports: [
    CommonModule,
    DrinksPageRoutingModule,
    SharedModule,
    ButtonModule,
    DynamicDialogModule,
    CardModule,
  ]
})
export class DrinksPageModule { }
