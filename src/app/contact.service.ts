// File: data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = 'http://localhost:8087'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  getAllContact(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/contact`);
  }

  getContactById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/contact/${id}`);
  }

  postData(contact: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/api/contact`, contact, { headers });
  }

  
}
