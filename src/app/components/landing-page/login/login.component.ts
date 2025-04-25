import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';
import { UsersService } from '../../../services/users/users.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { provideAuth, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseError } from '@firebase/util'; 

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

 
  constructor(  private router: Router,  public landing: LandingPageService,  public userService: UsersService) {}

  async login() {
    try {
      const user = await this.userService.login(this.email, this.password);
      console.log('Login erfolgreich:', user);
      /* ---------------------------------- */
    // Avatar aus Firestore holen
    const profile = this.userService.getUserByEmail(user.email || '');
    if (profile) {
    console.log('Eingeloggter User:', profile);
    // Z. B. im Service speichern für globalen Zugriff
    this.userService.setTempUser(profile);
}

      this.router.navigate(['/main']); 
    } catch (error: any) {
      this.error = this.getErrorMessage(error.code ?? '');
    }
  }

  googleLogin() {
    this.userService.googleLogin();  // Ruft die Methode im UsersService auf
    this.router.navigate(['/main']);  // Navigiere nach erfolgreichem Login
  }


  getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'Benutzer nicht gefunden!';
      case 'auth/wrong-password':
        return 'Falsches Passwort!';
      case 'auth/invalid-email':
        return 'Ungültiges E-Mail-Format!';
      default:
        return 'Unbekannter Fehler, bitte versuche es später erneut.';
    }
  }

  change(){
    this.landing.landing.set('request')
  }
  
  goToRegister(){
    this.landing.landing.set('register')
  }

}
