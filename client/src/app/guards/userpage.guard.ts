import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { combineLatest, map } from 'rxjs';

export const userpageGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userId = authService.getuserid(); // Method to get current logged-in user's ID
  const profileId = route.params['id']; // Assuming the route parameter for the profile ID is 'id'

  if (userId === profileId) {
    return true;
  } else {
    return combineLatest([
      authService.$isloggedin,
      authService.$Manager,
      authService.$Pointeur,
      authService.$Recruteur,
    ]).pipe(
      map(([isLoggedin, isManager, isPointeur, isRecruteur]) => {
        if (isLoggedin || isManager || isPointeur || isRecruteur) {
          return true;
        } else {
          return router.createUrlTree(['/auth/login']);
        }
      })
    );
  }
};
