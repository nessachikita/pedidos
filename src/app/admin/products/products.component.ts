import { Component, signal } from '@angular/core';
import { DialogService, DynamicDialogRef,  } from 'primeng/dynamicdialog';

import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [DialogService]
})
export class ProductsComponent {
  isLoading = signal(false);
  products$ = this.productsService.findAllProductsWithCategoryNames();
  ref: DynamicDialogRef;

  constructor(private productsService: ProductsService, public dialogService: DialogService) {}

  showProductCreation() {
    this.ref = this.dialogService.open(CreateProductComponent, {
      header: 'Añadir Producto',
      width: '50vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });
  }

  showProductUpdate(product: Product ) {
    console.log(product);
    this.ref = this.dialogService.open(UpdateProductComponent,{
        header: 'Actualizar Producto',
        width: '50vw',
        modal:true,
        data: {product},
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
    });
  }

  getCategoryNameById(idCategoria: number) {
    this.productsService.findCategoryById(idCategoria).subscribe({
      next: (categoria) => {
        console.log('Nombre de la categoría:', categoria.nombre);
        console.log('Petición de categoría enviada y respondida');
      },
      error: (error) => {
        console.error('Error al obtener la categoría:', error);
      }
    });

  }
}
