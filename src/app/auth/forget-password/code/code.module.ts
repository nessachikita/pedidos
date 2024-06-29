import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    InputOtpModule,
    ButtonModule
  ]
})
export class CodeModule { }
