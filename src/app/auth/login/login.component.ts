import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RouteNav } from '../../models/nav.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [DialogService]
})
export class LoginComponent {

closeSidebar(arg0: any) {
throw new Error('Method not implemented.');
}
  ref: DynamicDialogRef ;

  isLoading = signal(false);

  loginForm = this.authService.formAuthLogin();

  getErrorMessage(field: string) {
    let error = this.loginForm.get(field);
    let message;

    if (error.errors['required']) {
      message = 'El campo es requerido';
    }
    if (error.hasError('minlength') || error?.hasError('maxlength')) {
      message = 'Debe colocar un mínimo de 6 caracteres y un máximo de 16';
    }

    return message;
  }

  isValidField(field: string) {
    const error = this.loginForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  onSubmit() {
    console.log('iniciar sesión');
    this.isLoading.set(true);
    const user = this.loginForm.value as Partial<User>;

    this.loginForm.patchValue({
      password: ''
    });

    this.authService
      .login(user)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        tap((response) => {
          if (response.is_staff) {
            this.router.navigateByUrl('/pages/home');
          } else {
            this.router.navigateByUrl('/home-admin');
          }
          this.UserService.getUserID(user.username).subscribe((id) => {
            this.authService.blockUser(id, 0).subscribe();
          });
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.UserService.checkifuserexist(user.username).subscribe(
              (isExist) => {
                if (isExist) {
                  this.UserService.getUserAttempts(user.username).subscribe(
                    (intentos) => {
                      if (intentos >= 2) {
                        this.showMessage(
                          'error',
                          error.status.toString(),
                          'Su usuario se encuentra bloqueado debido a múltiples intentos fallidos. Por favor, restablezca su contraseña.'
                        );
                      } else if (intentos === 1) { // Segundo intento, advierte sobre el bloqueo en el próximo intento
                        this.showMessage(
                          'error',
                          error.status.toString(),
                          'Advertencia: Al tercer intento fallido su usuario será bloqueado.'
                        );
                      } else { // Primer intento o menos de dos intentos
                        this.showMessage(
                          'error',
                          error.status.toString(),
                          'Su contraseña es incorrecta. Por favor, intenta de nuevo.'
                        );
                      }
                      this.UserService.getUserID(user.username).subscribe(
                        (id) => {
                          this.authService
                            .blockUser(id, intentos + 1)
                            .subscribe();
                        }
                      );
                    }
                  );
                } else {
                  this.showMessage(
                    'error',
                    error.status.toString(),
                    'El usuario no existe. Por favor, intenta de nuevo.'
                  );
                }
              }
            );
          } else {
            this.showMessage(
              'error',
              error.status.toString(),
              'Ocurrió un error inesperado. Por favor, intenta de nuevo.'
            );
          }
          return throwError(error);
        })
      ).subscribe();
    console.log(user);
  }

  token = this.tokenService.getToken();


  constructor(
    private UserService: UserService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
  ) {this.authService.closeDialog$.subscribe((close) => {
    if (close) {
      this.ref.close(); 
    }
  });}

  showForget() {
    const dialogConfig = {
        header: 'Olvido de contraseña',
        width: '60vw',
        modal: true,
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
    };

    this.ref = this.dialogService.open(ForgetPasswordComponent, dialogConfig);
  }
}

