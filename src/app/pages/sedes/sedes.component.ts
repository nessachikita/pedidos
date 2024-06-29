import { Component, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { SedesService } from '../../services/sedes.service';
import { Observable, finalize } from 'rxjs';
import { Sedes } from '../../models/sedes.model';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.scss']
})
export class SedesComponent {
  isLoading = signal(true);

  getSedes = this.sedesService.getSedes();

  exportCart() {
    this.cartService.exportCart();
  }

  exportCartToWhatsApp(numero): void {
    const whatsappLink = `https://wa.me/58${numero}`;
    // window.open(whatsappLink, '_blank');
    this.cartService.exportCartToWhatsApp(numero);
  }

  sedes$: Observable<Sedes[]> = this.sedesService.getSedes().pipe(
    finalize(() => this.isLoading.set(false))
  );

  constructor(public cartService: CartService, public sedesService: SedesService) {}
}
