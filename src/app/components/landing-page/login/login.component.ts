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
    RouterLink,
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

  constructor(
    private router: Router,
    public landing: LandingPageService,
    public userService: UsersService,
    public authService: AuthService,
    public localStorageS: LocalStorageService,
    // public channelsService: ChannelsService
    private auth: Auth,
  ) {
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    // if (navEntries.length > 0 && navEntries[0].type === 'reload') { }
    if (!this.authService.isLoggedIn || (navEntries.length > 0 && (navEntries[0].type === 'reload' || navEntries[0].type === 'back_forward'))) {
      this.authService.loadCurrentUserFromStorage();
      if (this.userService.currentUser.id) {
        this.router.navigate(['/main']);
      }
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
      case 'auth/email-not-verified':
        return 'Bitte bestätige deine E-Mail-Adresse. Du kannst dir eine neue Bestätungs-E-Mail senden lassen.';
      default:
        return 'Unbekannter Fehler, bitte versuche es später erneut.';
    }
  }

  async login(gast = false) {
    if (gast) {
      this.email = 'gast@user.de'
      this.password = 'gast123'
    }
    try {
      const user = await this.authService.login(this.email, this.password);

      // Warte, bis Users und Channel aus Firestore geladen wurden
      await Promise.all([
        this.userService.waitUntilUsersLoaded(),
        // this.channelsService.waitUntilChannelsLoaded(),
        // this.channelsService.setupChannelsListener()
      ]);


      const profile = this.userService.getUserByEmail(user.email || '');

      if (!profile) {
        this.error = 'Benutzerprofil konnte nicht gefunden werden.';
        return;
      }

      this.userService.currentUser = profile;
      if (!gast) {
        this.localStorageS.saveObject('currentUser', profile);
      }
      this.router.navigate(['/main']);

    } catch (error: any) {
      if (error instanceof FirebaseError) {
        this.error = this.getErrorMessage(error.code);
      } else {
        this.error = error.message || 'Unbekannter Fehler beim Login.';
      }

      setTimeout(() => {
        this.error = '';
      }, 5000);
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
