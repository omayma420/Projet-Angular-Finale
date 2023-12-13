// paiement.component.ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaiementService } from '../paiement.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FactureService } from '../facture.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  paiementArray: { id: number, type_carte: string; numero_carte: string; date_expiration_carte: Date; }[] = [];
  newPaiement: { id: number; type_carte: string; numero_carte: string; date_expiration_carte: Date; } = { id: 0, type_carte: '', numero_carte: '', date_expiration_carte: new Date() };

  constructor(private dataService: PaiementService, private router: Router, private factureService: FactureService) { }

  ngOnInit(): void {
    this.loadPaiementData();
  }

  loadPaiementData() {
    this.dataService.getAllPaiement().subscribe(
      (data: any[]) => {
        console.log('Server response:', data);

        if (Array.isArray(data) && data.length > 0) {
          this.paiementArray = data.map((paiement: { id: number, type_carte: string; numero_carte: string; date_expiration_carte: Date }) => ({
            id: paiement.id,
            type_carte: paiement.type_carte,
            numero_carte: paiement.numero_carte,
            date_expiration_carte: paiement.date_expiration_carte,
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
    const formattedDateExpirationCarte = moment(this.newPaiement.date_expiration_carte).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    // Convertissez les chaînes formatées en objets Date
    this.newPaiement.date_expiration_carte = new Date(formattedDateExpirationCarte);

    this.dataService.postData(this.newPaiement).subscribe(
      response => {
        console.log('Server response after save:', response);
        this.loadPaiementData();

        // Stockez les informations de paiement dans le service FactureService
        this.factureService.setPaymentData(response);

        // Naviguez vers la page de facturation
        this.router.navigate(['/facture']);
      },
      error => {
        console.error('Error saving data:', error);
      });

    // Réinitialiser le formulaire
    this.resetForm();
  }

  private resetForm() {
    this.newPaiement = { id: 0, type_carte: '', numero_carte: '', date_expiration_carte: new Date() };
  }
}
