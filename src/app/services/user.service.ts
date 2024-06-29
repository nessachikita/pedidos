import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, first, last, map, of, throwError } from 'rxjs';
import { User, UserViewModel } from '../models/user.model';
import { TokenService } from './token.service';
import { UserRegister, Userr } from '../models/register.model';
import { AuthService } from './auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUpdateUser } from '../models/forms/form_update_user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUser: string = environment.apiUsuarios;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private tokenService: TokenService) {}


  createUser(user: Userr): Observable<Userr> {
    const userToCreate = {
        ...user,
        is_superuser: false,
        is_active: true,
        is_staff: false,
        intentos: 0,
      };

    return this.http.post<Userr>(`${this.apiUser}`, userToCreate);
  }

  currentLoggedUser() {
    const userId = this.tokenService.getUserIdFromToken();
    if (!userId) {
      return throwError(() => new Error('No user logged in'));
    }
    return of(userId);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUser}/${id}/`);
  }
  currentLoggedStaff() {
    const user = this.tokenService.getUserIdFromToken();
    if (!user || !user.is_staff) {
      // Si no hay usuario o el usuario no es staff, lanza un error
      return throwError(() => new Error('User is not staff or not logged in'));
    }
    // Si el usuario es staff, retorna el usuario
    return of(user);
}

  currentUser(): Observable<UserViewModel[]> {
    return this.http.get<UserViewModel[]>(`${this.apiUser}`);
  }

  updateUser(body: Partial<UserRegister>, id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUser}/${id}/`, body);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUser}/${id}/`);
  }

  FormUpdateUser(): FormGroup {
    const form = this.fb.group({
      first_name: new FormControl('', [
        Validators.required,
      ]),
      last_name: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required, Validators.email,
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(16),
      ]),
      is_staff: new FormControl(''),
      numeroTelefono: new FormControl(''),
    });

    return form;
  }

  checkifuserexist(username: string): Observable<boolean> {
    return this.http
      .get<User[]>(`${this.apiUser}`)
      .pipe(map((users) => users.some((user) => user.username === username)));
  }
  getUserAttempts(username: string): Observable<number> {
    return this.http.get<User[]>(`${this.apiUser}`).pipe(
      map((users) => {
        const user = users.find((user) => user.username === username);
        return user ? user.intentos : 0;
      })
    );
  }
  getUserID(username: string): Observable<number> {
    return this.http.get<User[]>(`${this.apiUser}`).pipe(
        map(users => {
            const user = users.find(user => user.username === username);
            return user ? user.id : null;
        })
    );
  }
  getUserIDByEmail(email: string): Observable<number> {
    return this.http.get<any[]>(`${this.apiUser}`).pipe(
        map(users => {
            const user = users.find(user => user.email === email);
            return user.id ? user.id : null;
        })
    );
}

}
