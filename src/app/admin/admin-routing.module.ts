import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home-admin',
    title: 'Inicio',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'products',
    title: 'Inicio',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'reportes',
    title: 'Reportes',
    loadChildren: () =>
      import('./reportes/reportes.module').then((m) => m.ReportesModule),
  },
  {
    path: 'users',
    title: 'Usuarios',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'settings',
    title: 'Opciones',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'pedidos',
    title: 'Pedidos',
    loadChildren: () =>
      import('./pedidos/pedidos.module').then((m) => m.PedidosModule),
  },
  {
    path: '**',
    redirectTo: 'home-admin'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
