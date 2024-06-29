import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DessertsPageComponent } from './sno-desserts-page.component';




const routes: Routes = [
  {
    path: '',
    component: DessertsPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DessertPageRoutingModule { }
