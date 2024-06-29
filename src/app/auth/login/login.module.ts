import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CheckboxModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    DynamicDialogModule,
    FormsModule
  ],
})
export class LoginModule {}
