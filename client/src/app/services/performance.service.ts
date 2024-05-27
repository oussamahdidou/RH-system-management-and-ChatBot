import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  constructor(
    private readonly authservice: AuthService,
    private readonly http: HttpClient
  ) {}
  getabscences(): Observable<any> {
    return this.http.get(`http://localhost:5111/api/Performance/Abscences`);
  }
  justifyabscence(id: number): Observable<any> {
    return this.http.get(`http://localhost:5111/api/Performance/Justify/${id}`);
  }
}
