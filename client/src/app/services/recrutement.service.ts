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
  refusercandidature(id: number): Observable<any> {
    return this.http.get(`http://localhost:5111/api/Recrutement/Refuser/${id}`);
  }
  selectionner(id: number, date: any): Observable<any> {
    return this.http.post(
      `http://localhost:5111/api/Recrutement/Selectionner`,
      {
        id: id,
        dateTime: date,
      }
    );
  }
  getjobs(): Observable<any> {
    return this.http.get(`http://localhost:5111/api/Recrutement/Jobs`);
  }
  postuler(id: number, form: any): Observable<any> {
    return this.http.post(
      `http://localhost:5111
/api/Recrutement/Candidature/${id}`,
      form
    );
  }
  integrer(
    id: any,
    username: any,
    emailAddress: any,
    password: any,
    salaireDeBase: any,
    integrationDate: any,
    poste: any,
    role: any
  ): Observable<any> {
    return this.http.post(`http://localhost:5111/api/Account/Register/User`, {
      id: id,
      username: username,
      emailAddress: emailAddress,
      password: password,
      salaireDeBase: salaireDeBase,
      integrationDate: integrationDate,
      poste: poste,
      role: role,
    });
  }
}
