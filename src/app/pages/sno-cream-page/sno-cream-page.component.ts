import { Component, input, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';
import { Observable, finalize } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { TokenService } from '../../services/token.service';


@Component({
  selector: 'app-sno-cream-page',
  templateUrl: './sno-cream-page.component.html',
  styleUrl: './sno-cream-page.component.scss',
  providers: [DialogService]
})
export class CreamPageComponent {
  isLoading = signal(true);

  products$: Observable<Product[]> = this.ProductsService.findCream().pipe(
    finalize(() => this.isLoading.set(false))
  );

  ref: DynamicDialogRef ;

  constructor(
    private tokenService: TokenService,
    private ProductsService: ProductsService,
    public dialogService: DialogService) {}


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
