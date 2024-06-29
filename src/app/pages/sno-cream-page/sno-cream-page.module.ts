import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreamPageRoutingModule } from './sno-cream-routing.module';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../../shared/shared.module';
import { CreamPageComponent } from './sno-cream-page.component';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    CreamPageComponent
  ],
  imports: [
    CommonModule,
    CreamPageRoutingModule,
    SharedModule,
    ButtonModule,
    CardModule,
    DynamicDialogModule,
    ToastModule,
  ]
})
export class CreamPageModule { }
