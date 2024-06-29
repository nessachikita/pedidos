import { FormControl } from "@angular/forms";

export interface FormUpdateUser{
  first_name: FormControl<string>;
  last_name: FormControl<string>;
  email: FormControl<string>;
  username: FormControl<string>;
  is_staff: FormControl<boolean>;
  numeroTelefono: FormControl<string>;
}

