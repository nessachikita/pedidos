import { Component, OnInit, signal } from '@angular/core';
import { RouteProduct } from '../../models/product.model';
import { Router } from '@angular/router';
import { Observable, catchError, finalize, of } from 'rxjs';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  cepillados = [];


  isLoading = signal(false);
  product$: Observable<Product>
  routesproduct: RouteProduct[] = [
    {
      name: 'Ver más',
      routerLink: '/pages/sno-cream',
    },
  ];
  productsService: any;
  cartService: any;

  constructor(private router: Router, private homeService:HomeService) {}

  ngOnInit() {
    this.homeService.getCepillados().subscribe({
      next: (data) => {
        this.cepillados = data;
      },
      error: (error) => console.error('Error fetching cepillados:', error)
    });
  }

  addToCart(productId: number): void {
    this.productsService.findOneProduct(productId).subscribe({
      next: (product) => {
        this.cartService.addToCart(product);
        this.router.navigate(['/pages/shopping-cart']);
      },
      error: (error) => console.error('Error al agregar al carrito:', error)
    });
  }
}
