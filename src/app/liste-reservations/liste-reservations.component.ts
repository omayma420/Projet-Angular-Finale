// liste-reservations.component.ts

import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service'; // Assurez-vous de fournir le chemin correct
import * as moment from 'moment';

interface ReservationArray {
  id: number;
  client: { id: number, nom: string };
  voiture: { id: number, modele: string };
  date_debut: Date;
  date_fin: Date;
}

@Component({
  selector: 'app-liste-reservations',
  templateUrl: './liste-reservations.component.html',
  styleUrls: ['./liste-reservations.component.css']
})
export class ListeReservationsComponent implements OnInit {
  reservations: ReservationArray[] = [];



  newReservation: any = {
    client: { id: 0, nom: '' },
    voiture: { id: 0, modele: '' },
    date_debut: new Date(),
    date_fin: new Date()
  };
  
  clients: any[] = [];
  voitures: any[] = [];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadReservations();
    this.loadClients();
    this.loadVoitures();
  }

  // liste-reservations.component.ts

ajouterReservation() {
  // Utilisez Moment.js pour formater les dates
  const formattedDateDebut = moment(this.newReservation.date_debut).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  const formattedDateFin = moment(this.newReservation.date_fin).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

  // Convertissez les chaînes formatées en objets Date
  this.newReservation.date_debut = new Date(formattedDateDebut);
  this.newReservation.date_fin = new Date(formattedDateFin);

  // Assurez-vous que le client et la voiture sont bien définis
  
    // Modifier la logique pour envoyer seulement l'identifiant de la voiture
    const reservationPayload = {
      client: { id: this.newReservation.client.id, nom: this.newReservation.client.nom },
      voiture: { id: this.newReservation.voiture.id },  // Envoyer seulement l'identifiant de la voiture
      date_debut: this.newReservation.date_debut,
      date_fin: this.newReservation.date_fin
    };

    // Ajoutez la logique d'ajout de réservation ici
    // Utilisez reservationPayload pour accéder aux données de la nouvelle réservation
    this.reservationService.ajouterReservation(reservationPayload).subscribe(
      (data: any) => {
        console.log('Server response (Ajout Reservation):', data);
        // Après l'ajout d'une nouvelle réservation, rafraîchissez la liste
        this.loadReservations();
        // Réinitialisez le formulaire après l'ajout réussi
        this.resetForm();
      },
      error => {
        console.error('Error adding reservation:', error);
      }
    );
    
 
}

  
  

  loadReservations() {
    this.reservationService.getAllReservations().subscribe(
      (data: any[]) => {
        this.reservations = data;
      },
      error => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  loadClients() {
    this.reservationService.getAllClients().subscribe(
      (data: any[]) => {
        this.clients = data;
      },
      error => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  loadVoitures() {
    this.reservationService.getAllVoitures().subscribe(
      (data: any[]) => {
        this.voitures = data;
      },
      error => {
        console.error('Error fetching voitures:', error);
      }
    );
  }

  resetForm() {
    // Réinitialisez les valeurs du formulaire après l'ajout réussi
    this.newReservation = {
      client: { id: 0, nom: '' },
      voiture: { id: 0, modele: '' },
      date_debut: new Date(),
      date_fin: new Date()
    };
  }
}
