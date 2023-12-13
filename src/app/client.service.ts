// File: data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8087'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  getAllClient(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/client`);
  }

  getClientById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/client/${id}`);
  }

  postData(client: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/api/client`, client, { headers });
  }

 
  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/client/delete/${id}`);
  }

  
  
}
