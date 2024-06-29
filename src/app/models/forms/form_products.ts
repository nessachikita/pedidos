import { FormControl } from "@angular/forms";

export interface FormProducts {
  nombre: FormControl<string>,
  descripcion: FormControl<string>,
  precio: FormControl<number>,
  cantidad: FormControl<number>,
  imagen: FormControl<string>,
  id_categoria: FormControl<number>,
  id_tipo: FormControl<number>,
}
