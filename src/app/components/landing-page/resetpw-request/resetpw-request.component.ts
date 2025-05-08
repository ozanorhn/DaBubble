import { Component } from '@angular/core';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';
import { FormsModule } from '@angular/forms';
 import { CommonModule } from '@angular/common';
 import { Auth, sendPasswordResetEmail } from '@angular/fire/auth'; 
import { UsersService } from '../../../services/users/users.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-resetpw-request',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './resetpw-request.component.html',
  styleUrl: './resetpw-request.component.scss'
})
export class ResetpwRequestComponent {
  email: string = '';
  showMessage: boolean = false;
  
  constructor(public landing: LandingPageService, private auth: Auth, private router: Router ) {}

  goToLogin(){
    this.landing.landing.set('login')
  }

  async sendeResetAnfrage() {
    if (!this.email) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      console.log('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    try {
      await sendPasswordResetEmail(this.auth, this.email);
      this. openMessage();
     
    } catch (err) {
      console.error(err);
      alert('Fehler beim Senden der E-Mail. Bitte überprüfen Sie die Adresse.');
    }
  }

  openMessage() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.goToLogin(); 
    }, 3000); 
  }
  
  
}
