import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { catchError, map, throwError } from 'rxjs';
import { UserService } from '../../services/user.service';

export const jwtGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const user: UserService = inject(UserService);

  return user.currentLoggedUser().pipe(
    catchError((error) => {
      router.navigateByUrl('/home');
      return throwError(() => error);
    }),
    map((user) => !!user)
  );

};

export const adminGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const user: UserService = inject(UserService);

  return user.currentLoggedStaff().pipe(
    catchError((error) => {
      router.navigateByUrl('/home');
      return throwError(() => error);
    }),
    map((user) => !!user)
  );
};
