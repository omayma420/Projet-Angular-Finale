import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private isAuthenticated: boolean = false;

  login(username: string, password: string): Observable<boolean> {
    // Simulate a static user with a hardcoded username and password
    const staticUsername = 'admin';
    const staticPassword = 'admin';

    // Check if provided credentials match the hardcoded user
    if (username === staticUsername && password === staticPassword) {
      this.isAuthenticated = true;
      return of(true);
    } else {
      this.isAuthenticated = false;
      return of(false);
    }
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.isAuthenticated);
  }
}

import { AuthentificationComponent } from './authentification/authentification.component';