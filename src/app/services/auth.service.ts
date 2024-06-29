import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthLogin } from '../models/forms/form_auth_login';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Category } from '../models/category.model';
import { User, UserLogin } from '../models/user.model';
import { TokenService } from './token.service';
import { AuthRegister } from '../models/forms/form_auth_register';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiCategoria: string = environment.apiCategoria;
  private apiToken: string = environment.apiToken;
  private apiReset:string= environment.apiReset;
  private apiCodigo: string= environment.apiCodigo;
  private apiUsuarios: string= environment.apiUsuarios;
  correo:string;


  constructor(
    private tokenService: TokenService,
    private fb: NonNullableFormBuilder,
    private http: HttpClient,) {}
    


  resend(){
    this.requestReset(this.correo).subscribe()
    }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiCategoria).pipe(
      map((data) =>
        data.map((category) => ({
          nombre: category.nombre,
          id_categoria: category.id_categoria,
        }))
      )
    );
  }

  formAuthLogin(): FormGroup<AuthLogin> {
    const form: FormGroup<AuthLogin> = this.fb.group({
      username: new FormControl('', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
    });

    return form;
  }

  formAuthRegister(): FormGroup<AuthRegister> {
    const form: FormGroup<AuthRegister> = this.fb.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl('', [Validators.required,]),
      numeroTelefono: new FormControl('', [Validators.required,
         Validators.minLength(11),
         Validators.maxLength(11)]),
      username: new FormControl('', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordMatchValidator
    });
    return form;
  }

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const password = formGroup.get('password');
      const confirmPassword = formGroup.get('confirmPassword');
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        // Retorno de un objeto de error si las contraseñas no coinciden
        return { passwordMismatch: true };
      }
      // Retorno de null si no hay errores
      return null;
    };
  }


  public login(body:Partial<User>) {
    return this.http.post<UserLogin>(`${this.apiToken}`,body).pipe(
      tap((user: UserLogin) => {
        this.tokenService.setToken(user.access);
      })
    );
  }

  public logOut() {
    this.tokenService.deleteToken();
  }
  public blockUser(userId: number, attempts: number) {
    console.log('Se intento enviar la peticion patch');
    const url = `https://proyectosno.pythonanywhere.com/api/usuarios/${userId}/`;
    const body = { intentos: attempts };

    return this.http.patch(url, body);
  }
  public requestReset(email: string) {
    const body = { email: email };
    this.correo=email
    return this.http.post(`${this.apiReset}`, body);
  }
  public verifycode(code: string){
    const body={
      email:this.correo,
      code:code
    }
    return this.http.post(`${this.apiCodigo}`,body)
  }

  private closeDialog = new BehaviorSubject<boolean>(false);
  closeDialog$ = this.closeDialog.asObservable();

  notifyDialog() {
    this.closeDialog.next(true);
  }
  changePassword(password: string, id:number) {
    const body ={password:password}
    console.log(id)
    this.blockUser(id,0).subscribe()
    return this.http.patch(`${this.apiUsuarios}/${id}/`,body)
  }
  getemail(){
    return this.correo
  }
}
