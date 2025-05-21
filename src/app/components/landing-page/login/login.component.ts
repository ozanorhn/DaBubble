import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';
import { UsersService } from '../../../services/users/users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { provideAuth, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseError } from 'firebase/app';
import { AuthService } from '../../../services/auth/auth.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { User } from '../../../classes/user.class';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink, FormsModule, CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';


  constructor(
    private router: Router,
    public landing: LandingPageService,
    public userService: UsersService,
    public authService: AuthService,
    public localStorageS: LocalStorageService
  ) { }


  async login() {
    try {
      const user = await this.authService.login(this.email, this.password);
      if (user.email !== null) {
        this.userService.currentUser = this.userService.getUserByEmail(user.email) as User;
      }
      const profile = this.userService.getUserByEmail(user.email || '');
      this.localStorageS.saveObject('currentUser', profile);
      this.router.navigate(['/main']);
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        this.error = this.getErrorMessage(error.code);
      } else {
        this.error = 'Unbekannter Fehler beim Login.';
      }
      setTimeout(() => {
        this.error = '';
      }, 5000);
    }
  }


  async googleLogin() {
    try {
      await this.authService.googleLogin();  // Erst auf Erfolg warten
      this.router.navigate(['/main']);        // Dann weiterleiten
    } catch (error: any) {
      console.error('Fehler beim Google-Login:', error);
      this.error = error.message || 'Google-Login fehlgeschlagen.';
    }
  }


  getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'Benutzer nicht gefunden!';
      case 'auth/wrong-password':
        return 'Falsches Passwort!';
      case 'auth/invalid-email':
        return 'Ungültiges E-Mail-Format!';
      case 'auth/invalid-credential':
        return 'E-Mail oder Passwort ist falsch.';
      default:
        return 'Unbekannter Fehler, bitte versuche es später erneut.';
    }
  }


  change() {
    this.landing.landing.set('request')
  }


  goToRegister() {
    this.landing.landing.set('register')
  }


}
