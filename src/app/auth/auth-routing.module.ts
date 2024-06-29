import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar Sesión',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'forget-password',
    title: 'Olvido de contraseña',
    loadChildren: () =>
      import('./forget-password/forget-password.module').then((m) => m.ForgetPasswordModule),
  },
  
  {
    path: 'create-user',
    title: 'Registrarse',
    loadChildren: () =>
      import('./create-user/create-user.module').then((m) => m.CreateUserModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
