import { Component } from '@angular/core';
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
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';

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
    public dmService: DirectMessagesService
    // public channelsService: ChannelsService
  ) {
    // authService.getCurrentUser();
  }

  async login(gast = false) {
    if (gast) {
      this.email = 'gast@user.de'
      this.password = 'gast123'
    }
    try {
      const user = await this.authService.login(this.email, this.password);
  
      // ✅ Warte, bis Users und Channel aus Firestore geladen wurden
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
      await this.authService.googleLogin();
      this.router.navigate(['/main']);
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
    this.landing.landing.set('request');
  }

  goToRegister() {
    this.landing.landing.set('register');
  }
}
