// reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  ajouterReservation(newReservation: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/reservation`, newReservation);
    // Remplacez "/ajouterReservation" par l'URL de votre endpoint pour ajouter une réservation
  }

  private baseUrl = 'http://localhost:8087'; // Remplacez par l'URL de votre backend Spring Boot

  constructor(private http: HttpClient) { }

  getAllReservations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/reservation`);
  }

  getReservationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/reservation/${id}`);
  }

  postData(reservation: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(reservation);
    return this.http.post<any>(`${this.baseUrl}/api/reservation`, reservation, { headers });
  }

  updateData(id: number, reservation: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.baseUrl}/api/reservation/${id}`, reservation, { headers, observe: 'response' })
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleUpdateError(error))
      );
  }

  private handleUpdateError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 200 && error.error === 'redirect:/reservation') {
      // Handle redirect logic here
      // You may navigate to the /patient route or perform any other action
      // Return a new observable to satisfy the catchError signature
      return throwError('Redirected to /reservation');
    } else {
      return throwError(error);
    }
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/reservation/delete/${id}`);
  }

  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/client`);
  }

  getAllVoitures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/voiture`);
  }
}
