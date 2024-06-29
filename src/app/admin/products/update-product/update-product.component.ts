import { Component, signal, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '../../../models/products.model';
import { ProductsService } from '../../../services/products.service';
import {
  DialogService,
  DynamicDialogRef,
  DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { Observable, finalize, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService],
})
export class UpdateProductComponent implements OnInit {
  isLoading = signal(false);
  uploadedFiles: any[] = [];
  fileName: string = '';

  product: Product = this.dialogConfig.data.product;
  ref: DynamicDialogRef;
  categorias: Observable<any[]>;
  formData: any;
  tipos: Observable<any[]>= this.productsService.findTipos();
  selectedTipo: any;
  selectedCategoria: any;
  updateProductForm = this.productsService.FormUpdateProduct();
  imagePreview: string | ArrayBuffer;
  fileToUpload: File = null;
  tipodesactivado = true;
  constructor(
    private dialogConfig: DynamicDialogConfig,
    private productsService: ProductsService,
    private dialogRef: DynamicDialogRef,
    public messageService: MessageService,
    public dialogService: DialogService,
    private http: HttpClient
  ) {}

  onSubmit() {
    this.isLoading.set(true);
    const formData = new FormData();

    // Agregar todos los campos del formulario a FormData, excepto 'imagen'
    Object.keys(this.updateProductForm.value).forEach((key) => {
      if (key !== 'imagen') {
        formData.append(key, this.updateProductForm.value[key]);
      }
    });

    // Agregar el archivo de imagen a FormData
    if (this.fileToUpload) {
      formData.append('imagen', this.fileToUpload, this.fileToUpload.name);
    }

    // Ajustar la llamada al servicio para usar FormData
    // Asegúrate de que el servicio 'updateProduct' esté preparado para recibir FormData
    const productData: Partial<{ nombre: string; descripcion: string; precio: number; cantidad: number; imagen: string; id_categoria: any; id_tipo: number; }> = {
      nombre: this.updateProductForm.value.nombre,
      descripcion: this.updateProductForm.value.descripcion,
      precio: this.updateProductForm.value.precio,
      cantidad: this.updateProductForm.value.cantidad,
      id_categoria: this.updateProductForm.value.id_categoria,
      id_tipo: this.updateProductForm.value.id_tipo
    };
    if (this.fileToUpload) {
      this.enviarImagen(this.formData);
    }
    this.productsService.updateProduct(productData, this.product.id_producto)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Producto actualizado',
            detail: 'El producto ha sido actualizado exitosamente.'
          }) ;
          setTimeout(() => window.location.reload(), 1000);
        })
      ).subscribe(
        response => {
          // Manejar la respuesta exitosa aquí
        },
        error => {
          // Manejar errores aquí
        }
      );
  }

  ngOnInit() {
    this.fileToUpload = null;
    if (this.product && this.product.imagen) {
      this.imagePreview = this.product.imagen;
    }
    this.categorias = this.productsService.findCategoria();
    this.categorias.subscribe((categorias) => {
      const categoriaSeleccionada = categorias.find(
        (categorias) => categorias.id_categoria === this.product?.id_categoria
      );
      this.selectedCategoria = categoriaSeleccionada;
    });
    this.tipos.subscribe((tipos) => {
      const tipoSeleccionado = tipos.find(
        (tipos) => tipos.id_tipo === this.product.id_tipo
      );
      this.selectedTipo = tipoSeleccionado;
    });

    this.updateProductForm.get('id_categoria').valueChanges.subscribe((value) => {
      console.log(value);
      this.selectedCategoria = value;
      if (this.selectedCategoria.id_categoria === 1) {
        this.tipodesactivado = false;
      } else {
        this.updateProductForm.get('id_tipo').reset();
        this.tipodesactivado = true;
      }
    });
  }

  imagenSeleccionada(event: Event) {
    const elemento = event.target as HTMLInputElement;
    const archivo = elemento.files ? elemento.files[0] : null;
    if (archivo) {
      // Preparar FormData
      this.formData = new FormData();
      this.formData.append('imagen', archivo, archivo.name);

      // Opcional: Mostrar una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(archivo);
      this.fileToUpload = archivo;
      // Aquí puedes llamar a la función que envía el FormData a tu API

    }
  }

  enviarImagen(formData: FormData) {
    // Reemplaza 'url_de_tu_api' con la URL de tu API
    const url = 'https://proyectosno.pythonanywhere.com/api/productos/2/';

    // Realizar la petición HTTP para enviar el archivo
    this.http.patch(url, formData).subscribe(
      (response) => {
        console.log('Imagen subida con éxito', response);
        // Manejar la respuesta de éxito aquí
      },
      (error) => {
        console.error('Error al subir la imagen', error);
        // Manejar el error aquí
      }
    );
  }
  eliminar(){
    this.productsService.deleteProduct(this.product.id_producto)
    .pipe(
      finalize(() => this.isLoading.set(false)),
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Producto eliminado',
          detail: 'El producto ha sido eliminado exitosamente.'
        }) ;
        setTimeout(() => window.location.reload(), 1000);
      })
    ).subscribe(
      response => {
        // Manejar la respuesta exitosa aquí
      },
      error => {
        // Manejar errores aquí
      }
    );
  }
}
