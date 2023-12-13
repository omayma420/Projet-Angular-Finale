import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgenceService } from '../agence.service';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css']
})
export class AgenceComponent implements OnInit {

  agence: any;

  constructor(private route: ActivatedRoute, private agenceService: AgenceService) { }

  ngOnInit(): void {
    // Utilisez paramMap pour récupérer l'ID de manière plus robuste
    this.route.paramMap.subscribe(params => {
      const agenceId = 1

      // Vérifiez si l'ID est défini avant de faire l'appel au service
      if (agenceId) {
        console.log('Agence ID:', agenceId);

        // Appelez le service pour obtenir les détails de l'agence
        this.agenceService.getAgenceById(+agenceId).subscribe(
          (data: any) => {
            this.agence = data;
            console.log('Agence Data:', this.agence);
          },
          error => {
            console.error('Error fetching agence data:', error);
          }
        );
      } else {
        console.error('Agence ID is undefined.');
      }
    });
  }
}

