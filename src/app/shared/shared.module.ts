import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule, Scroll } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    CarouselComponent,
    NavBarComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    StyleClassModule,
    ButtonModule,
    DropdownModule,
    ProgressSpinnerModule,
    RouterModule,
    FormsModule,
    ScrollPanelModule,
    ToastModule
  ],
  exports: [
    CarouselComponent,
    NavBarComponent,
    CartComponent,
  ]
})
export class SharedModule { }
