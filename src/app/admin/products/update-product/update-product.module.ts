import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProductComponent } from './update-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    DynamicDialogModule,
    DialogModule,
    BadgeModule,
    TagModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,

  ]
})
export class UpdateProductModule { }
