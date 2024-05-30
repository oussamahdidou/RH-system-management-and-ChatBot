import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbootService {
  constructor(private readonly http: HttpClient) {}
  chatboot(input: any): Observable<any> {
    return this.http.post(`http://localhost:5000/ask`, {
      input: input,
    });
  }
}
