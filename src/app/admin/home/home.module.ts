import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [ HomeComponent],
  imports: [
    CommonModule,
    HomeAdminRoutingModule,
    SharedModule,
    ButtonModule,
  ]
})
export class HomeModule { }
