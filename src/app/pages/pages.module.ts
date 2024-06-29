import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePageModule } from './home-page/home-page.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { CreamPageModule } from './sno-cream-page/sno-cream-page.module';
import { DessertsPageModule } from './sno-desserts-page/sno-desserts-page.module';
import { DrinksPageModule } from './sno-drinks-page/sno-drinks-page.module';
import { CartModule } from '../shared/components/cart/cart.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HomePageModule,
    ShoppingCartModule,
    CreamPageModule,
    DessertsPageModule,
    DrinksPageModule,
    CartModule,
    ToastModule
  ],

})
export class PagesModule { }
