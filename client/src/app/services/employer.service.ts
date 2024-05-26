import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployerService {
  constructor(
    private readonly authservice: AuthService,
    private readonly http: HttpClient
  ) {}
  getallemployers(): Observable<any> {
    return this.http.get('http://localhost:5111/api/Employers/Employers');
  }
  getemployersbyid(id: String): Observable<any> {
    return this.http.get(`http://localhost:5111/api/Employers/Employers/${id}`);
  }
  employerabscencesByid(id: String): Observable<any> {
    return this.http.get(
      `http://localhost:5111/api/Performance/Charts/Abscences/${id}`
    );
  }
  employerabscences(): Observable<any> {
    return this.http.get(
      `http://localhost:5111/api/Performance/Charts/Abscences`
    );
  }
  employersurtempsByid(id: String): Observable<any> {
    return this.http.get(
      `http://localhost:5111/api/Performance/Charts/Surtemps/${id}`
    );
  }
  employersurtemps(): Observable<any> {
    return this.http.get(
      `http://localhost:5111/api/Performance/Charts/Surtemps`
    );
  }
  topemployerssurtemps(): Observable<any> {
    return this.http.get(
      `http://localhost:5111/api/Performance/Charts/Surtemps/Employers`
    );
  }
  topemployersabscences(): Observable<any> {
    return this.http.get(
      `http://localhost:5111/api/Performance/Charts/Abscences/Employers`
    );
  }
}
