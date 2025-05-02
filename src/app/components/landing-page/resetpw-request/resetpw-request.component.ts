import { Component } from '@angular/core';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth'; // <== Wichtig

@Component({
  selector: 'app-resetpw-request',
  imports: [FormsModule, CommonModule],
  templateUrl: './resetpw-request.component.html',
  styleUrl: './resetpw-request.component.scss'
})
export class ResetpwRequestComponent {
  email: string = '';

  constructor(public landing: LandingPageService, private auth: Auth) {}

  goToLogin() {
    this.landing.landing.set('login');
  }

  

  async sendeResetAnfrage() {
    if (!this.email) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    try {
      await sendPasswordResetEmail(this.auth, this.email);
      alert('E-Mail zum Zurücksetzen wurde gesendet.');
    } catch (err) {
      console.error(err);
      alert('Fehler beim Senden der E-Mail. Bitte überprüfen Sie die Adresse.');
    }
  }
}
