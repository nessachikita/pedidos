import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinksPageComponent } from './sno-drinks-page.component';




const routes: Routes = [
  {
    path: '',
    component: DrinksPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrinksPageRoutingModule { }
