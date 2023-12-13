import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { PaiementComponent } from './paiement/paiement.component';
import { ContactComponent } from './contact/contact.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AgenceComponent } from './agence/agence.component';
import { FactureComponent } from './facture/facture.component';
import { landingComponent } from './landing/landing.component';
import { VoitureComponent } from './voiture/voiture.component';
import { AjoutVoitureComponent } from './ajout-voiture/ajout-voiture.component';
import { ListeReservationsComponent } from './liste-reservations/liste-reservations.component';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { AdminComponent } from './admin/admin.component';



const routes: Routes = [
  { path: 'client', component: ClientComponent },
  { path: 'client/paiement' ,component : PaiementComponent},
  { path: 'contact' ,component : ContactComponent},
  {path :'reservation',component : ReservationComponent},
  {path :'agence',component : AgenceComponent},
  {path : 'facture',component : FactureComponent},
  { path: '', component: landingComponent } ,
  {path : 'voiture' ,component :VoitureComponent},
  {path :'ajouter',component :AjoutVoitureComponent},
  {path :'reservations',component :ListeReservationsComponent},
  { path: 'gestion_client', component: AjoutClientComponent },
  {path:'login',component:AuthentificationComponent},
  {path:'admin/dashboard',component:AdminComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }