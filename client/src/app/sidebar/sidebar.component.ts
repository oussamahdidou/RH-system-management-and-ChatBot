import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(
    private readonly authservice: AuthService,
    private readonly router: Router
  ) {}
  pointeur() {
    this.authservice.$Pointeur
      .pipe(
        map((isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigate(['/abscence/abscences']);
          } else {
            console.log('access denied');
            Swal.fire({
              title: 'Access denied',
              text: 'this is for pointer',
              timer: 3000,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Login',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/auth/login';
              }
            });
          }
        })
      )
      .subscribe();
  }
  manager() {
    this.authservice.$Manager
      .pipe(
        map((isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigate(['/abscence/conges']);
          } else {
            console.log('access denied');
            Swal.fire({
              title: 'Access denied',
              text: 'this is for manager',
              timer: 3000,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Login',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/auth/login';
              }
            });
          }
        })
      )
      .subscribe();
  }
  recruteur() {
    this.authservice.$Recruteur
      .pipe(
        map((isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigate(['/recrutement/annonces']);
          } else {
            console.log('access denied');
            Swal.fire({
              title: 'Access denied',
              text: 'this page is for recruteur',
              timer: 3000,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Login',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/auth/login';
              }
            });
          }
        })
      )
      .subscribe();
  }
  private _myBool: boolean = false;

  @Output() myBoolChange = new EventEmitter<boolean>();

  get myBool(): boolean {
    return this._myBool;
  }

  set myBool(value: boolean) {
    this._myBool = value;
    this.myBoolChange.emit(this._myBool);
  }

  toggleBool() {
    this.myBool = !this.myBool;
  }
}
