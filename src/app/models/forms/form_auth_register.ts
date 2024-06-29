import { FormControl } from '@angular/forms';

export interface AuthRegister {
  first_name: FormControl<string>;
  last_name: FormControl<string>;
  email: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  direccion: FormControl<string>;
  numeroTelefono: FormControl<string>;

}
