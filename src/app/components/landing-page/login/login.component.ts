import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';
import { UsersService } from '../../../services/users/users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FirebaseError } from 'firebase/app';
import { AuthService } from '../../../services/auth/auth.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { User } from '../../../classes/user.class';
import { ChannelsService } from '../../../services/channels/channels.service';
import { Auth, sendEmailVerification, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [
    // RouterLink,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  isLoginDataValid = true;

  loginData = {
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    public landing: LandingPageService,
    public userService: UsersService,
    public authService: AuthService,
    public localStorageS: LocalStorageService,
    private auth: Auth
  ) { }


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
      case 'auth/email-not-verified':
        return 'Bitte bestätige deine E-Mail-Adresse. Du kannst dir eine neue Bestätungs-E-Mail senden lassen.';
      default:
        return 'Unbekannter Fehler, bitte versuche es später erneut.';
    }
  }

  async login(gast = false) {
    if (gast) {
      this.loginData.email = 'gast@user.de'
      this.loginData.password = 'gast123'
    }
    try {
      const user = await this.authService.login(this.loginData.email, this.loginData.password);

      await Promise.all([
        this.userService.waitUntilUsersLoaded(),
      ]);

      const profile = this.userService.getUserByEmail(user.email || '');

      if (!profile) {
        this.error = 'Benutzerprofil konnte nicht gefunden werden.';
        return;
      }
      this.userService.componentExsits = false;
      this.userService.currentUser = profile;
      if (!gast) {
        this.localStorageS.saveObject('currentUser', profile);
      }
      this.router.navigate(['/main']);

    } catch (error: any) {
      if (error instanceof FirebaseError) {
        this.isLoginDataValid = false;
        this.error = this.getErrorMessage(error.code);
      } else {
        this.error = error.message || 'Unbekannter Fehler beim Login.';
      }

      setTimeout(() => {
        this.error = '';
      }, 2500);
    }

  }


  async signInWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/main']);
    } catch (error: any) {
      console.error('Fehler beim Google-Login:', error);
      this.error = error.message || 'Google-Login fehlgeschlagen.';
    }
  }




  change() {
    this.landing.landing.set('request');
  }

  goToRegister() {
    this.landing.landing.set('register');
  }

  async resendVerificationEmail() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;

      if (user.emailVerified) {
        this.error = 'Diese E-Mail-Adresse wurde bereits bestätigt.';
      } else {
        await sendEmailVerification(user);
        this.error = 'Bestätigungs-E-Mail wurde erneut gesendet.';
      }
    } catch (err: any) {
      this.error = 'Fehler beim erneuten Senden der E-Mail: ' + (err.message || '');
    }

    setTimeout(() => {
      this.error = '';
    }, 25000);
  }

}
