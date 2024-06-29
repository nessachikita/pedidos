import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password.component';
import { CodeComponent } from './code/code.component';
import { InputOtpModule } from 'primeng/inputotp';
import { DividerModule } from 'primeng/divider';
import { PassworddComponent } from './password/password.component';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    ForgetPasswordComponent,
    CodeComponent,
    PassworddComponent
  ],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    FormsModule,
    InputOtpModule,
    DividerModule,
    PasswordModule,
  ],

})
export class ForgetPasswordModule { }
