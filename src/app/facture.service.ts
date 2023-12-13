// facture.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  private reservationData: any;
  private clientData: any;
  private paymentData: any;
  private voitureData: any;

  setReservationData(data: any) {
    this.reservationData = data;
  }

  getReservationData() {
    return this.reservationData;
  }

  setClientData(data: any) {
    this.clientData = data;
  }

  getClientData() {
    return this.clientData;
  }


  setPaymentData(data: any) {
    this.paymentData = data;
  }

  getPaymentData() {
    return this.paymentData;
  }
  setVoitureData(data: any) {
    this.voitureData = data;
  }

  getVoitureData() {
    return this.voitureData;
  }

  reserveVoiture(voiture: any): void {
    this.setVoitureData(voiture);
  }

  private selectedVoiture: any;

  setSelectedVoiture(voiture: any): void {
    this.selectedVoiture = voiture;
  }

  getSelectedVoiture(): any {
    return this.selectedVoiture;
  }

  clearSelectedVoiture(): void {
    this.selectedVoiture = null;
  }

}
