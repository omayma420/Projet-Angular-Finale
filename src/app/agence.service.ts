// agence.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  private baseUrl = 'http://localhost:8087'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  getAgenceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/agence/${id}`);
  }
}

