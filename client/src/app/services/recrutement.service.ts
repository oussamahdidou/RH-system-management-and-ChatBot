import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecrutementService {
  constructor(private readonly http: HttpClient) {}
  listannonce(): Observable<any> {
    return this.http.get('http://localhost:5111/api/Recrutement/Annonces');
  }
  listcandidature(id: number): Observable<any> {
    return this.http.get(
      `http://localhost:5111/api/Recrutement/Annonces/${id}`
    );
  }
  candidaturebyid(id: number): Observable<any> {
    return this.http.get(
      `http://localhost:5111/api/Recrutement/Candidature/${id}`
    );
  }
}
