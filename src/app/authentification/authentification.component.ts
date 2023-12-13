// src/app/authentification/authentification.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent {

  username: string = 'admin';
  password: string = 'admin';
  loginError: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  submitForm() {
    this.loginService.login(this.username, this.password).subscribe(
      (loggedIn) => {
        if (loggedIn) {
          this.go(); // Appel de la méthode go après la vérification des informations d'identification
        } else {
          this.loginError = true;
        }
        this.router.navigate(['/admin/dashboard'])
      },
      (error) => {
        console.error('Login error:', error);
        this.loginError = true;
      }
    );
  }

  go() {
    console.log('Tentative de redirection...');
    if (this.username === 'admin' && this.password === 'admin') {
      console.log('Redirection réussie vers /voiture');
      this.router.navigate(['/voiture']);
    } else {
      console.log('Échec de la redirection : identifiants incorrects');
      this.loginError = true;
    }
  
  
  }
  
}
