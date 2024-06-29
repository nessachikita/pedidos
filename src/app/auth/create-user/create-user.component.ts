import { Component, ViewEncapsulation, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { UserRegister, Userr } from '../../models/register.model';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  isLoading= signal(false);
  value!: string;
  repeatValue : string;

  registerForm = this.authService.formAuthRegister();

  showPassword = false;


  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }


  onKeyDownUser(event: KeyboardEvent) {
    console.log(event);
    const key = event.key;
    const excludedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ','+',
      '(',')','{','}','[','_','"','°','¨','?','´','<','>','*','&','^','%','$','#','@','!','~','`','|','/',
       '`', '-', '=', '[', ']', '\\', ';', '\'', ',', '.', '/', '¡', '¿'];
    if (excludedKeys.includes(key)) {
      event.preventDefault();
    }
  }

  onKeyDownUsername(event: KeyboardEvent) {
    console.log(event);
    const key = event.key;
    const excludedKeys = [ ' ','+', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      '(',')','{','}','[','_','"','°','¨','?','´','<','>','*','&','^','%','$','#','@','!','~','`','|','/',
       '`', '-', '=', '[', ']', '\\', ';', '\'', ',', '.', '/', '¡', '¿'];
    if (excludedKeys.includes(key)) {
      event.preventDefault();
    }
  }

  onKeyDownPassword(event: KeyboardEvent) {
    console.log(event);
    const key = event.key;
    const excludedKeys = [' ', '@',
      '(',')','{','}','[','_','"','°','¨','´','<','>','&','^','%','~','`','|','/',
       '`', '-', '=', '[', ']', '\\', ';', '\'', ',',  '/', '¡', '¿'];
    if (excludedKeys.includes(key)) {
      event.preventDefault();
    }
  }

  onKeyDown3(event: KeyboardEvent) {
    console.log(event);
    const key = event.key;
    const excludedKeys = [ ' ',
      '(',')','{','}','[','_','"','°','¨','?','´','<','>','*','&','^','%','$','#','@','!','~','`','|','/',
       '`', '-', '=', '[', ']', '\\', ';', '\'', ',', '.', '/', '¡', '¿'];
    if (excludedKeys.includes(key)) {
      event.preventDefault();
    }
  }

  onKeyDownNumber(event: KeyboardEvent) {
    console.log(event);
    const key = event.key;
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    if (!allowedKeys.includes(key)) {
      event.preventDefault();
    }
}

  getErrorMessage(field: string) {
    let error = this.registerForm.get(field);
    let message;
  
    if (field === 'numeroTelefono' && (error.hasError('minlength') || error.hasError('maxlength'))) {
      message = 'Debe tener 11 caracteres';
    } else {
      if (error.errors['required']) {
        message = 'El campo es requerido';
      }
      if (error.hasError('minlength') || error?.hasError('maxlength')) {
        message = 'Debe colocar un mínimo de 6 caracteres y un máximo de 16';
      }
    }
  
    return message;
  }

  isValidField(field: string) {
    const error = this.registerForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private authService: AuthService) {}


    onSubmit() {
      if (this.value !== this.repeatValue) {
        this.showMessage('error', 'Error', 'Las contraseñas no coinciden.');
        return;
      }
    
      const phoneNumber = this.registerForm.get('numeroTelefono').value;
      if (phoneNumber.length !== 11) {
        this.showMessage('error', 'Error', 'El número de teléfono debe tener 11 caracteres.');
        return;
      }

      const username = this.registerForm.get('username').value;
      if (username.length < 6 || username.length > 16) {
        this.showMessage('error', 'Error', 'El nombre de usuario debe tener entre 6 y 16 caracteres.');
        return;
      }

      const password = this.registerForm.get('password').value;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!+*?#$])[A-Za-z\d.!+*?#$]{8,}$/;
      if (!passwordRegex.test(password)) {
        this.showMessage('error', 'Error', 'La contraseña debe ser entre 6 y 16 carácteres, tener al menos una mayúscula, una minúscula, un número y uno de estos caracteres especiales: . ! + * ? # $');
        return;
      }
    
      const user: Userr = this.registerForm.value;
      this.userService.createUser(user).subscribe({
        next: (response) => {
          this.showMessage('success', 'Operación éxitosa', 'Usuario creado con éxito.');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (error) => {
          if (error.error && error.error.email) {
            this.showMessage('error', 'Error', error.error.email[0]);
          } else {
            this.showMessage('error', 'Error', 'Ocurrió un error al crear el usuario. Por favor, intente de nuevo.');
          }
        }
      });
    }
  }
