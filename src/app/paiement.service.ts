// File: data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private baseUrl = 'http://localhost:8087'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  getAllPaiement(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/paiement`);
  }

  getPaiementById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/paiement/${id}`);
  }

  postData(paiement: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/api/paiement`, paiement, { headers });
  }

  
}
