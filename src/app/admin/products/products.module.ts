import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../../shared/shared.module';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProductsRoutingModule } from './products-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
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
export class ProductsModule { }
