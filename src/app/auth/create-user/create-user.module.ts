import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserRoutingModule } from './create-user-routing.module';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CreateUserComponent } from './create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';



@NgModule({
  declarations: [
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    CreateUserRoutingModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    DividerModule,
    PasswordModule,
  ]
})
export class CreateUserModule { }
