import { Component, ViewEncapsulation, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription, finalize, tap } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Category } from '../../../models/category.model';
import { HttpClient } from '@angular/common/http';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class CreateProductComponent {
  isLoading = signal(false);
  tipos: any[] = [];
  categorias: Category[] = [];
  private subscription: Subscription = new Subscription();
  createProductForm = this.productService.formCreateProducts();
  tipodeshabilitado = true;
  uploadedFiles: any[] = [];
  selectedCategory: any;
  formData: FormData;
  imagePreview: string;
  fileToUpload: any;
  productoañadido: any;

  onUpload(event: UploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'Imagen actualizada',
      detail: '',
    });
  }

  onSubmit() {
    console.log('Form Value:', this.createProductForm.value);
    this.isLoading.set(true);
    const a: any = this.createProductForm.value;
    const resulta: any = this.productService
      .createProduct({
        ...this.createProductForm.value,
        id_categoria: this.selectedCategory.id_categoria,
        id_tipo: a.id_tipo.id_tipo,
      })
      .pipe(
        finalize(() => this.isLoading.set(false)),
        tap(() =>
          
          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'Producto registrado correctamente',

          })
        )
      )
      .subscribe((result) => {
        if (this.fileToUpload) {
          const formData = new FormData();
          formData.append('image', this.fileToUpload, this.fileToUpload.name);
          this.enviarImagen(formData, result.id_producto);
        }
      });

  }

  constructor(
    private messageService: MessageService,
    private productService: ProductsService,
    private dialogConfig: DynamicDialogConfig,
    private http: HttpClient,
    private ref: DynamicDialogRef,
  ) {}

  ngOnInit(): void {
    this.categorias = [
      { id_categoria: 1, nombre: 'Cepillados' },
      { id_categoria: 2, nombre: 'Postres' },
      { id_categoria: 3, nombre: 'Bebidas' },
    ];

    this.subscription.add(
      this.productService.findTipos().subscribe((tipos) => {
        this.tipos = tipos;
      })
    );

    this.createProductForm
      .get('id_categoria')
      .valueChanges.subscribe((value) => {
        this.selectedCategory = value;
        if (this.selectedCategory.id_categoria === 1) {
          this.tipodeshabilitado = false;
        } else {
          this.createProductForm.get('id_tipo').reset();
          this.tipodeshabilitado = true;
        }
      });
  }

  imagenSeleccionada(event) {
    console.log('Imagen seleccionada', event)
    const archivo = event.files[0];
    if (archivo) {
      this.fileToUpload = archivo;
    }
  }

  enviarImagen(formData: FormData, id: number) {
    // Reemplaza 'url_de_tu_api' con la URL de tu API
    const url = `https://proyectosno.pythonanywhere.com/api/productos/${id}/`;
    console.log('Asi se ve una actualizacion buena', formData);
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
}
