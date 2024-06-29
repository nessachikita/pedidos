import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'shopping-cart',
    title: 'Carrito de Productos',
    loadChildren: () =>
      import('../pages/shopping-cart/shopping-cart.module').then(
        (m) => m.ShoppingCartModule
      ),
  },
  {
    path: 'cart',
    title: 'Carrito',
    loadChildren: () =>
      import('../shared/components/cart/cart.module').then(
        (m) => m.CartModule
      ),
  },
  {
    path: 'sno-cream',
    title: 'Cepillados',
    loadChildren: () =>
      import('../pages/sno-cream-page/sno-cream-page.module').then(
        (m) => m.CreamPageModule
      ),
  },
  {
    path: 'sno-desserts',
    title: 'Postres',
    loadChildren: () =>
      import('../pages/sno-desserts-page/sno-desserts-page.module').then(
        (m) => m.DessertsPageModule
      ),
  },
  {
    path: 'sno-drinks',
    title: 'Bebidas',
    loadChildren: () =>
      import('../pages/sno-drinks-page/sno-drinks-page.module').then(
        (m) => m.DrinksPageModule
      ),
  },
  {
    path: 'sedes',
    title: 'Sedes',
    loadChildren: () =>
      import('../pages/sedes/sedes.module').then(
        (m) => m.SedesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
