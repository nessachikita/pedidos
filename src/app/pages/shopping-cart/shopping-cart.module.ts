import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    SharedModule,
    InputNumberModule,
    TabViewModule,
    ImageModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    StepsModule,
    RadioButtonModule,
    ProgressSpinnerModule,
    CheckboxModule,
  ],
})
export class ShoppingCartModule { }
