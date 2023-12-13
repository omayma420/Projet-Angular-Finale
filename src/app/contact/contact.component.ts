import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactArray: { id: number, nom: string; email: string;  tel: string; sujet:string;contenu:string }[] = [];
  newContact: { id: number; nom: string; email: string;  tel: string; sujet:string;contenu:string ;} = { id: 0, nom: '', email: '', tel: '',sujet:'',contenu:'' };
  

  constructor(private dataService: ContactService ,private router: Router) { }

  ngOnInit(): void {
    this.loadContactData();
  }

  loadContactData() {
    this.dataService.getAllContact().subscribe(
      (data: any[]) => {
        console.log('Server response:', data);

        if (Array.isArray(data) && data.length > 0) {
          this.contactArray = data.map((contact: { id: number; nom: string; email: string; tel: string; sujet:string; contenu:string  }) => ({
            id: contact.id,
            nom: contact.nom,
            email: contact.email ,
            tel: contact.tel,
            sujet: contact.sujet,
            contenu : contact.contenu
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
    this.dataService.postData(this.newContact).subscribe(
      response => {
        console.log('Server response after save:', response);
        this.loadContactData();
        // Navigate to the payment page
        alert('Message envoyé avec succès!');
      },
      error => {
        console.error('Error saving data:', error);
      });

    // Reset the form
    this.resetForm();
  }

  private resetForm() {
    this.newContact = { id: 0, nom: '', email: '', tel: '',sujet:'',contenu:'' };
  }
}
