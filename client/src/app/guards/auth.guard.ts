import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { async, map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.$isloggedin.pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        return router.createUrlTree(['/auth/login']);
      }
    })
  );
};
