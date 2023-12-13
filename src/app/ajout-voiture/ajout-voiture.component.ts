import { Component, OnInit } from '@angular/core';
import { VoitureService } from '../voiture.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-ajout-voiture',
  templateUrl: './ajout-voiture.component.html',
  styleUrls: ['./ajout-voiture.component.css']
})
export class AjoutVoitureComponent implements OnInit {
  voitureArray: { id: number, couleur: string; matricule: string; modele: string; prix_location: number; imageUrl: string; date_fab: Date; marque: { nomMar: string; };}[] = [];
  marques: any[] = [];
  newVoiture: any = {
    couleur: '',
    matricule: '',
    modele: '',
    prix_location: 0,
    imageUrl: '',
    date_fab: new Date(),
    marque: {
      nomMar: ''
    }
  };

  constructor(
    private dataService: VoitureService,
    private router: Router
  ) {}

  ngOnInit() {
    // Fetch marques and voiture data when the component is initialized
    this.loadMarques();
    this.loadVoitureData();
  }

  onSubmit() {

    // Utilisez Moment.js pour formater les dates
   // Utilisez Moment.js pour formater les dates
   const formattedDateFab = moment(this.newVoiture.date_fab).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

   // Convertissez les chaînes formatées en objets Date
   this.newVoiture.date_fab = new Date(formattedDateFab);
   
    // Assurez-vous que this.newReservation.clientData contient les données du client
    this.dataService.ajouterVoiture(this.newVoiture).subscribe(
      (data: any) => {
        console.log('Server response (Ajout Voiture):', data);
        // After adding a new car, refresh the list
        this.loadVoitureData();
      },
      error => {
        console.error('Error adding voiture:', error);
      }
    );
  }

  loadMarques() {
    this.dataService.getAllMarques().subscribe(
      (data: any[]) => {
        console.log('Marques:', data);
        this.marques = data;
      },
      error => {
        console.error('Error fetching marques:', error);
      }
    );
  }

  loadVoitureData() {
    this.dataService.getAllVoiture().subscribe(
      (data: any[]) => {
        console.log('Server response:', data);
        this.voitureArray = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onDelete(index: number) {
    console.log(index);

    const deletedTask = this.voitureArray[index];

    if (deletedTask && deletedTask.id) {
      this.dataService.deleteData(deletedTask.id).subscribe(
        response => {
          console.log('Server response after delete:', response);
          this.voitureArray.splice(index, 1);
        },
        error => {
          console.error('Error deleting data:', error);
        }
      );
    } else {
      console.error('Task or Task ID is missing.');
    }
  }

  onUpdate(index: number) {
    const updatedTask = this.voitureArray[index];

    if (updatedTask && updatedTask.id) {
      console.log('Updating Patient ID:', updatedTask.id);
      console.log('Updating Patient Data:', updatedTask);

      // Assign the existing data to the updatedPatientForm property
      this.newVoiture = { ...updatedTask };
    } else {
      console.error('Task or Task ID is missing.');
    }
  }
}
