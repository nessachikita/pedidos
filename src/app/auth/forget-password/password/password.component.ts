import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PassworddComponent {
  registerForm = this.authService.formAuthRegister();

  value!: string;
  repeatValue: string;
  showPassword = false;

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  onKeyDownPassword(event: KeyboardEvent) {
    console.log(event);
    const key = event.key;
    const excludedKeys = [
      ' ',
      '@',
      '(',
      ')',
      '{',
      '}',
      '[',
      '_',
      '"',
      '°',
      '¨',
      '´',
      '<',
      '>',
      '&',
      '^',
      '%',
      '~',
      '`',
      '|',
      '/',
      '`',
      '-',
      '=',
      '[',
      ']',
      '\\',
      ';',
      "'",
      ',',
      '/',
      '¡',
      '¿',
    ];
    if (excludedKeys.includes(key)) {
      event.preventDefault();
    }
  }

  todobien() {
    if (this.value !== this.repeatValue) {
      this.showMessage(
        'error', 'Error', 'Las contraseñas no coinciden. Por favor, ingrese nuevamente su nueva contraseña.'
      );
      return;
    }
  
    const password = this.value;
      console.log('contraseña actual', password)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!+*?#$])[A-Za-z\d.!+*?#$]{6,16}$/;
      if (!passwordRegex.test(password)) {
        console.log('todo bien')
        this.showMessage('error', 'Error', 'La contraseña debe ser entre 6 y 16 carácteres, tener al menos una mayúscula, una minúscula, un número y uno de estos caracteres especiales: . ! + * ? # $');
        return;

      }

      

    this.UserService.getUserIDByEmail(this.authService.getemail()).subscribe(
      (usuario) => {
        console.log('ID del usuario:', usuario);
        const userId = usuario;
        this.authService.changePassword(this.value, userId).subscribe(
          () => {
            console.log('Contraseña cambiada con éxito')
            this.showMessage(
              'success',
              'Contraseña cambiada',
              'La contraseña ha sido cambiada con éxito'
            );
            this.ref.close();
          },
          (error) => {
            console.error('Error al cambiar la contraseña:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener el ID del usuario:', error);
      }
    );
  }

  isValidField(field: string) {
    const error = this.registerForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  getErrorMessage(field: string) {
    let error = this.registerForm.get(field);
    let message;

    if (error.errors['required']) {
      message = 'El campo es requerido';
    }
    if (error.hasError('minlength') || error?.hasError('maxlength')) {
      message = 'Debe colocar un mínimo de 6 caracteres y un máximo de 16';
    }

    return message;
  }

  onKeyDown2(event: KeyboardEvent) {
    console.log(event);
    const key = event.key;
    const excludedKeys = [
      ' ',
      '(',
      ')',
      '{',
      '}',
      '[',
      '_',
      '"',
      '°',
      '¨',
      '´',
      '<',
      '>',
      '&',
      '^',
      '%',
      '~',
      '`',
      '|',
      '/',
      '`',
      '-',
      '=',
      '[',
      ']',
      '\\',
      ';',
      "'",
      ',',
      '/',
      '¡',
      '¿',
    ];
    if (excludedKeys.includes(key)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    this.todobien();
  }

  constructor(
    public dialogService: DialogService,
    private messageService: MessageService,
    private authService: AuthService,
    private UserService: UserService,
    private ref: DynamicDialogRef
  ) {}
}
