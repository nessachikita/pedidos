import {
  Component,
  OnInit,
  signal,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { RouteLogin } from '../../models/login.model';
import { MenuItem, MessageService } from 'primeng/api';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';
import { Observable, catchError, finalize, of } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ShoppingCartComponent implements OnInit {
  items: MenuItem[] | undefined;
  isLoading = true;
  id_producto: number;
  product$: Observable<Product>;
  productos: any[];
  selectedProducto: any;
  dropdownOptions: any[];
  toppings = this.ProductsService.findtopping();
  cantidadTotalProductos: number;
  cantidad: Product;
  id_tamano: number;
  nombretamaño: string;
  nombretopping: string;
  valortamaño: number = 0;
  valortopping: number = 0;
  valor: number;
  carrito: Product[] = [];
  selectedValue: any;
  toppingsdepurados: any;
  toppingsSeleccionados: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private ProductsService: ProductsService,
    private CartService: CartService,
    private messageService: MessageService
  ) {}

  filterUniqueToppings(toppings) {
    const unique = {};
    toppings.forEach((topping) => {
      unique[topping.nombre] = topping;
    });
    return Object.values(unique);
  }

  ngOnInit() {
    this.toppings.subscribe((data) => {
      this.toppingsdepurados = this.filterUniqueToppings(data);
      this.toppingsSeleccionados = 'Sin Topping';
      console.log(this.toppingsdepurados);
      console.log(this.toppingsSeleccionados);
    });

    const id_producto = this.config.data.id;
    this.ProductsService.findCountProduct(id_producto).subscribe(
      (cantidad) => {
        console.log('cantidad id tamano', cantidad);
        this.valor = cantidad.precio;
        this.cantidad = cantidad;
        this.carrito = this.CartService.getCart();
        if (Array.isArray(this.cantidad.tamanos)) {
          const tamanoPequeno: any = this.cantidad.tamanos.find(
            (t) => t.nombre === 'Pequeño'
          );
          if (tamanoPequeno) {
            console.log('tamanoPequeno', tamanoPequeno);
            this.id_tamano = tamanoPequeno.id_tamanos;
            this.nombretamaño = 'Pequeño';
          }
        } else {
          this.toppingsdepurados = null;
        }
        this.nombretopping = 'Sin topping';
        this.cantidadTotalProductos = cantidad.cantidad;
        this.dropdownOptions = Array.from(
          { length: cantidad.cantidad },
          (_, i) => i + 1
        );
      },
      (error) => {
        console.error('Error obteniendo la cantidad de productos:', error);
      }
    );
    this.product$ = this.ProductsService.findOneProduct(id_producto).pipe(
      finalize(() => (this.isLoading = false)),
      catchError((error) => {
        console.error('Error loading product:', error);
        return of(null);
      })
    );
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  asignarTopping(valor: number, nombre, event: any) {
    this.toppingsSeleccionados = nombre;
    console.log(this.toppingsSeleccionados);
    this.valortopping = 0;
    this.recalcularprecio();
    if (this.toppingsSeleccionados == 'Sin Topping') {
      this.nombretopping = 'Sin Topping';
      this.valortopping = 0;
    } else {
      this.nombretopping = nombre;
      if (this.nombretamaño == 'Pequeño' || this.nombretamaño == 'Mediano') {
        this.valortopping = 0.3;
        if (this.nombretamaño == 'Pequeño') {
          const tamañoObj = this.cantidad.tamanos.find(
            (tamaño) => tamaño.nombre === 'Pequeño'
          );
          this.valortamaño = tamañoObj.precio;
        }
      } else {
        this.valortopping = 0.5;
      }
    }
    this.recalcularprecio();
  }

  asignarTamano(valor: number, nombre, id) {
    this.nombretamaño = nombre;
    this.id_tamano = id;
    this.valortamaño = valor;
    if (id === undefined) {
      console.error('id_tamano es undefined');
      return;
    }
    if (this.toppingsSeleccionados == 'Sin Topping') {
      this.nombretopping = 'Sin Topping';
      this.valortopping = 0;
    } else {
      if (this.nombretamaño == 'Pequeño' || this.nombretamaño == 'Mediano') {
        this.valortopping = 0.3;
      } else {
        this.valortopping = 0.5;
      }
    }

    this.recalcularprecio();
    console.log(
      nombre,
      id,
      this.valortamaño,
      this.valortopping,
      this.cantidad.precio
    );
  }

  recalcularprecio() {
    // Asegurarse de que valortamaño sea un número, en caso de que sea 0 o un string.
    this.valortamaño = Number(this.valortamaño) || 0;

    // Convertir los valores a enteros (por ejemplo, 2.8 * 10 = 28 y 0.3 * 10 = 3)
    let valortamañoInt = this.valortamaño * 10;
    let valortoppingInt = this.valortopping * 10;

    // Realizar la suma como enteros
    let valorInt = valortamañoInt + valortoppingInt;

    // Convertir el resultado de nuevo a decimal dividiendo por 10
    this.valor = valorInt / 10;
    if (this.valor==0){

    }
    else{
    // Actualizar el precio en cantidad
    this.cantidad.precio = this.valor;
    }

  }
  addToShoppingCart() {
    if (!this.selectedValue) {
      this.showMessage('error', 'Error', 'Debe seleccionar una cantidad');
    } else {
      this.CartService.addToCart({
        id_producto: this.cantidad.id_producto,
        nombre: this.cantidad.nombre,
        descripcion: this.cantidad.descripcion,
        precio: this.valor * this.selectedValue,
        cantidad: this.selectedValue,
        imagen: this.cantidad.imagen,
        id_categoria: this.cantidad.id_categoria,
        id_tipo: this.cantidad.id_tipo,
        tamanos: [
          {
            nombre: this.nombretamaño,
            precio: 0,
            imagen: '',
            id_tamanos: this.id_tamano,
          },
        ],
        toppings: [{ nombre: this.nombretopping, precio: this.valortopping }],
      });

      const totalCantidad = this.carrito.reduce(
        (sum, item) => sum + item.cantidad,
        0
      );
      this.cantidad.cantidad -= totalCantidad;
      this.dropdownOptions = Array.from(
        { length: this.cantidad.cantidad },
        (_, i) => i + 1
      );
      this.showMessage(
        'success',
        'Operación exitosa',
        'Producto agregado al carrito'
      );
      this.selectedValue = undefined;
    }
  }
}
