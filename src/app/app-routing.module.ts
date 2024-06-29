import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { adminGuard } from './@core/guards/jwt.guards';


const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'home-admin',
        title: 'Inicio',
        loadChildren: () =>
          import('./admin/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'products',
        title: 'Inicio',
        loadChildren: () =>
          import('./admin/products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'reportes',
        title: 'Reportes',
        loadChildren: () =>
          import('./admin/reportes/reportes.module').then((m) => m.ReportesModule),
      },
      {
        path: 'users',
        title: 'Usuarios',
        loadChildren: () =>
          import('./admin/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'settings',
        title: 'Opciones',
        loadChildren: () =>
          import('./admin/settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'pedidos',
        title: 'Pedidos',
        loadChildren: () =>
          import('./admin/pedidos/pedidos.module').then((m) => m.PedidosModule),
      },
    ]
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'login',
    title: 'Login',
    loadChildren: () =>
      import('./auth/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'forget-password',
    title: 'Olvido de contraseña',
    loadChildren: () =>
      import('./auth/forget-password/forget-password.module').then((m) => m.ForgetPasswordModule),
  },
  {
    path: 'create-user',
    title: 'Registrarse',
    loadChildren: () =>
      import('./auth/create-user/create-user.module').then((m) => m.CreateUserModule),
  },
  {
    path: 'shopping-cart',
    title: 'Carrito de Productos',
    loadChildren: () =>
      import('./pages/shopping-cart/shopping-cart.module').then(
        (m) => m.ShoppingCartModule
      ),
  },
  {
    path: 'sno-cream',
    title: 'Cepillados',
    loadChildren: () =>
      import('./pages/sno-cream-page/sno-cream-page.module').then(
        (m) => m.CreamPageModule
      ),
  },
  {
    path: 'sno-desserts',
    title: 'Postres',
    loadChildren: () =>
      import('./pages/sno-desserts-page/sno-desserts-page.module').then(
        (m) => m.DessertsPageModule
      ),
  },
  {
    path: 'sno-drinks',
    title: 'Bebidas',
    loadChildren: () =>
      import('./pages/sno-drinks-page/sno-drinks-page.module').then(
        (m) => m.DrinksPageModule
      ),
  },
  {
    path: 'sedes',
    title: 'Sedes',
    loadChildren: () =>
      import('./pages/sedes/sedes.module').then(
        (m) => m.SedesModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
