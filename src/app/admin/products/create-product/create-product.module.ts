import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    DialogModule,
    FileUploadModule,
    
  ]
})
export class CreateProductModule { }
