import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImageModule,
    ButtonModule,
    RouterModule,
    ProgressSpinnerModule
  ]
})
export class HomePageModule { }
