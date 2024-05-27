import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { combineLatest, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private readonly router: Router
  ) {}
  username: string = '';
  password: string = '';
  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        combineLatest([
          this.authService.$isloggedin,
          this.authService.$Manager,
          this.authService.$Pointeur,
          this.authService.$Recruteur,
        ])
          .pipe(
            map(([isLoggedin, isManager, isPointeur, isRecruteur]) => {
              if (isLoggedin || isManager || isPointeur || isRecruteur) {
                return '/dashboard';
              } else {
                return `/employers/${response.unique_name}`;
              }
            })
          )
          .subscribe((targetRoute: string) => {
            this.router.navigate([targetRoute]);
          });
      },

      (error) => {
        console.log(error);
      }
    );
  }
}
