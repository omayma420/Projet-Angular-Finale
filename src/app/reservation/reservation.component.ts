// reservation.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../reservation.service';
import { FactureService } from '../facture.service';
import * as moment from 'moment';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservationArray: { id: number, date_debut: Date; date_fin: Date; clientData: any }[] = [];
  newReservation: { id: number; date_debut: Date; date_fin: Date; clientData: any } = {
    id: 0,
    date_debut: new Date(),
    date_fin: new Date(),
    clientData: {}
  };

  clientData: any;

  constructor(
    private dataService: ReservationService,
    private factureService: FactureService,
    private router: Router
  ) {
    this.clientData = this.factureService.getClientData();
  }

  ngOnInit(): void {
    this.loadReservationData();
  }

  loadReservationData() {
    this.dataService.getAllReservations().subscribe(
      (data: any[]) => {
        console.log('Server response:', data);

        if (Array.isArray(data) && data.length > 0) {
          this.reservationArray = data.map((reservation: any) => ({
            id: reservation.id,
            date_debut: moment(reservation.date_debut).toDate(),
            date_fin: moment(reservation.date_fin).toDate(),
            clientData: reservation.clientData 
          }));
        } else {
          console.warn('Data is not an array or is empty:', data);
        }
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onSubmit() {
    // Utilisez Moment.js pour formater les dates
    const formattedDateDebut = moment(this.newReservation.date_debut).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const formattedDateFin = moment(this.newReservation.date_fin).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    // Convertissez les chaînes formatées en objets Date
    this.newReservation.date_debut = new Date(formattedDateDebut);
    this.newReservation.date_fin = new Date(formattedDateFin);
    
    // Assurez-vous que this.newReservation.clientData contient les données du client
    


      this.dataService.postData(this.newReservation).subscribe(
        response => {
          console.log('Server response after save:', response);
          this.loadReservationData();

          this.factureService.setReservationData(response);

          this.router.navigate(['/client/paiement']);
        },
        error => {
          console.error('Error saving data:', error);
        });

      this.resetForm();
    
  }

  private resetForm() {
    this.newReservation = {
      id: 0,
      date_debut: new Date(),
      date_fin: new Date(),
      clientData: {}
    };
  }

  onDelete(index: number) {
    const deletedRes = this.reservationArray[index];

    if (deletedRes && deletedRes.id) {
      this.dataService.deleteData(deletedRes.id).subscribe(
        response => {
          console.log('Server response after delete:', response);
          this.reservationArray.splice(index, 1);
        },
        error => {
          console.error('Error deleting data:', error);
        }
      );
    } else {
      console.error('Reservation or Reservation ID is missing.');
    }
  }

  onUpdate(index: number) {
    const updatedRes = this.reservationArray[index];

    if (updatedRes && updatedRes.id) {
      console.log('Updating Reservation ID:', updatedRes.id);
      console.log('Updating Reservation Data:', updatedRes);

      this.newReservation = {
        ...updatedRes,
        date_debut: moment(updatedRes.date_debut).toDate(),
        date_fin: moment(updatedRes.date_debut).toDate(),
      };
    } else {
      console.error('Reservation or Reservation ID is missing.');
    }
  }

  getClientData(): any {
    return this.factureService.getClientData();
  }

  private formatDate(dateString: string): string {
    return moment(dateString).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  }
}