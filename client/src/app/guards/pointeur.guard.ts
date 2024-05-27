import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const pointeurGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.$Pointeur.pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        return router.createUrlTree(['/auth/login']);
      }
    })
  );
};
