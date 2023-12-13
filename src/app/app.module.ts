import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';




import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
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


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    PaiementComponent,
    ContactComponent,
    ReservationComponent,
    AgenceComponent,
    FactureComponent,
    landingComponent,
    VoitureComponent,
    AjoutVoitureComponent,
    ListeReservationsComponent,
    AjoutClientComponent,
    AuthentificationComponent,
    AdminComponent,
    
   
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    
     // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
