import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  cepillados = [
    { src: 'assets/images/helados/cocosette.jpg', alt: 'Cepillado 1' },
    { src: 'assets/images/helados/samba.jpg', alt: 'Cepillado 2' },
    { src: 'assets/images/helados/pirulin.jpg', alt: 'Cepillado 3' },
    { src: 'assets/images/helados/fresa.jpg', alt: 'Cepillado 4' },
    { src: 'assets/images/helados/parchita.jpg', alt: 'Cepillado 5' },
    { src: 'assets/images/helados/coco.jpg', alt: 'Cepillado 6' },
  ];

  constructor() { }

  getCepillados(): Observable<any[]> {
    return of(this.cepillados);
  }
}
