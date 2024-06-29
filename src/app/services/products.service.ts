import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Product } from '../models/products.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormProducts } from '../models/forms/form_products';
import { CartService } from './cart.service';
import { Category } from '../models/category.model';
import { FormUpdateProduct } from '../models/forms/form_update_product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  formUpdateProduct() {
    throw new Error('Method not implemented.');
  }
  private apiTamaños: string = environment.apiTamaños;
  private apiProductos: string = environment.apiProductos;
  private apiCategoria: string = environment.apiCategoria;
  private apiTipos: string = environment.apiTipos;
  private apiToppings: string = environment.apiToppings;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  findtopping(){
    return this.http.get<any>(`${this.apiToppings}`);
  }

  findAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiProductos}`);
  }

  deleteProduct(id_producto: number): Observable<any> {
    return this.http.delete<any>(`${this.apiProductos}${id_producto}`);
  }
  findAllProductsWithCategoryNames(): Observable<Product[]> {
    return this.findAllProducts().pipe(
      switchMap((products) => {
        if (products.length === 0) {
          return of([]);
        }

        const categoryRequests = products.map((product) =>
          this.findCategoryById(product.id_categoria).pipe(
            map((category) => ({
              ...product,
              categoryName: category.nombre,
            }))
          )
        );

        return forkJoin(categoryRequests);
      })
    );
  }

  findOneProduct(id_producto: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiProductos}${id_producto}`);
  }

  findCream(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiProductos}/por-categoria/1/`);
  }

  findDessert(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiProductos}/por-categoria/2/`);
  }

  findDrinks(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiProductos}/por-categoria/3/`);
  }

findcartcountbyid(id_producto: number): Observable<any> {
  const carrito = this.cartService.getCart();
  const productosFiltrados = carrito.filter(producto => producto.id_producto === id_producto);
  const cantidadTotal = productosFiltrados.reduce((sum, producto) => sum + producto.cantidad, 0);
  return of({ cantidad: cantidadTotal });
}

  findCountProduct(id_producto: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiProductos}${id_producto}`).pipe(
      switchMap((producto) =>
        producto.id_tipo ? this.findProductTamano(producto.id_tipo).pipe(
          switchMap((tamanos) =>
            this.findcartcountbyid(id_producto).pipe(
              map((cartCount) => ({
                ...producto,
                tamanos: tamanos,
                cantidad: producto.cantidad - cartCount.cantidad,
              }))
            )
          )
        ) : this.findcartcountbyid(id_producto).pipe(
          map((cartCount) => ({
            ...producto,
            cantidad: producto.cantidad - cartCount.cantidad,
          }))
        )
      )
    );
  }


  findProductTamano(
    id_tipo: number
  ): Observable<
    { nombre: string; precio: number; imagen: string; id_tamanos: number }[]
  > {
    return this.http.get<
      { nombre: string; precio: number; imagen: string; id_tamanos: number }[]
    >(`https://proyectosno.pythonanywhere.com/api/tamanos/por-tipo/${id_tipo}`);
  }

  findProductTopping(
    tamaño_id: number
  ): Observable<
    { nombre: string; precio: number;  id_toppings: number, id_tamano }[]
  > {
    return this.http.get<
      { nombre: string; precio: number; id_toppings: number; id_tamano: number }[]
    >(`https://proyectosno.pythonanywhere.com/api/toppings/${tamaño_id}`);
  }

  findCategoria(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiCategoria}`);
  }

  findCategoryById(id_categoria: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiCategoria}${id_categoria}`);
  }
  findTipos(): Observable<any> {
    return this.http.get<any>(`${this.apiTipos}`);
  }

  createProduct(
    productData: Partial<{
      nombre: string;
      descripcion: string;
      precio: number;
      cantidad: number;
      imagen: string;
      id_categoria: number;
      id_tipo: number;
    }>
  ): Observable<any> {
    return this.http.post(`${this.apiProductos}`, productData);
  }

  updateProduct(body, id: number): Observable<any> {
    if (body.imagen === null) {
      delete body.imagen;
    }

    const formattedBody = {
      ...body,
      id_categoria: body.id_categoria?.id_categoria || body.id_categoria,
    };
    return this.http.patch<any>(`${this.apiProductos}${id}/`, formattedBody);
  }

  formCreateProducts(): FormGroup<FormProducts> {
    const form: FormGroup<FormProducts> = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      precio: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      cantidad: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]),
      imagen: new FormControl(null, [Validators.required]),
      id_categoria: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      id_tipo: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
    return form;
  }

  FormUpdateProduct(): FormGroup<FormUpdateProduct> {
    const form: FormGroup<FormUpdateProduct> = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      precio: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      cantidad: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]),
      imagen: new FormControl(null, [Validators.required]),
      id_categoria: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      id_tipo: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });

    return form;
  }
  getToppingId(nombre: string, precio: number): Observable<number> {
    return this.http.get<any[]>(`${this.apiToppings}`).pipe(
      map(response => {
        const topping = response.find(t => t.nombre === nombre && t.precio === precio);
        return topping ? topping.id_toppings : null;
      })
    );
  }



}
