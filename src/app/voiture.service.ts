// File: data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  deleteData(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<any>(`${this.baseUrl}/api/voiture/${id}`, { headers });
  }
  
  

 ajouterVoiture(nouvelleVoiture: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/api/voiture`, nouvelleVoiture, { headers });
  }
  

  private baseUrl = 'http://localhost:8087'; // Remplacez par l'URL de votre backend Spring Boot

  constructor(private http: HttpClient) { }

  getAllVoiture(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/voiture`);
  }

  getVoitureById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/voiture/${id}`);
  }

  postData(voiture: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/api/voiture`, voiture, { headers });
  }

  reserveVoiture(voiture: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/voiture/reserver-voiture`, voiture);
  }

  getAllMarques(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/marque`);
  }

 

  // Ajoutez d'autres méthodes selon vos besoins

}
