import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const rhserviceGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return combineLatest([
    authService.$isloggedin,
    authService.$Manager,
    authService.$Pointeur,
    authService.$Recruteur,
  ]).pipe(
    map(([isLoggedin, isManager, isPointeur, isRecruteur]) => {
      if (isManager || isPointeur || isRecruteur) {
        return true;
      } else {
        return router.createUrlTree(['/auth/login']);
      }
    })
  );
};
