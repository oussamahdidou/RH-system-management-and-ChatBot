import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _$isLoggedin = new BehaviorSubject(false);
  $isloggedin = this._$isLoggedin.asObservable();
  private _$Manager = new BehaviorSubject(false);
  $Manager = this._$Manager.asObservable();
  private _$Pointeur = new BehaviorSubject(false);
  $Pointeur = this._$Pointeur.asObservable();
  private _$Recruteur = new BehaviorSubject(false);
  $Recruteur = this._$Recruteur.asObservable();
  jwt: string = '';
  token: any;
  headers: any | undefined;
  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this._$isLoggedin.next(true);
      this.jwt = localStorage.getItem('token') || '';
      this.token = this.getUser(this.jwt);

      if (this.token && this.token.role === 'Manager') {
        this._$Manager.next(true);
        this._$Pointeur.next(false);
        this._$Recruteur.next(false);
      } else if (this.token && this.token.role === 'Pointeur') {
        this._$Manager.next(false);
        this._$Pointeur.next(true);
        this._$Recruteur.next(false);
      } else if (this.token && this.token.role === 'Recruteur') {
        this._$Manager.next(false);
        this._$Pointeur.next(false);
        this._$Recruteur.next(true);
      }
      this.headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.jwt
      );
    } else {
      this._$isLoggedin.next(false);
    }
  }
  getUser(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  logout() {
    localStorage.removeItem('token');
    this._$isLoggedin.next(false);
  }
  login(username: string, password: string): Observable<any> {
    return this.http
      .post('http://localhost:5111/api/Account/Login', { username, password })
      .pipe(
        tap<any>(
          (response) => {
            localStorage.setItem('token', response['token']);
            this._$isLoggedin.next(true);
          },
          (error) => {
            console.log(error);
          }
        )
      );
  }
}
