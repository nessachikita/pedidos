import { Component, signal } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { TokenService } from '../../services/token.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-sno-desserts-page',
  templateUrl: './sno-desserts-page.component.html',
  styleUrl: './sno-desserts-page.component.scss',
  providers: [DialogService]
})
export class DessertsPageComponent {
  isLoading = signal(true);

  products$: Observable<Product[]> = this.ProductsService.findDessert().pipe(
    finalize(() => this.isLoading.set(false))
  );
  ref: DynamicDialogRef ;

  constructor(
    private tokenService: TokenService,
    private dialogService: DialogService,
    private ProductsService: ProductsService) {}

  show(id_producto: number) {
    this.ProductsService.findOneProduct(id_producto).subscribe(product => {
        if (product) {
            const dialogConfig = {
                header: product.nombre,
                width: '60vw',
                modal: true,
                breakpoints: {
                    '960px': '75vw',
                    '640px': '90vw'
                },
                data: { id: id_producto }
            };

            this.ref = this.dialogService.open(ShoppingCartComponent, dialogConfig);
        } else {
            console.error('Product or product name is invalid.');
        }
    });
}

buyNow() {
  console.log('Comprar')
  const token = this.tokenService.getToken();

  if (token) {
    alert('Puedes proceder con la compra');
  } else {
    alert('No puedes comprar sin iniciar sesión');
  }
}

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }


}
