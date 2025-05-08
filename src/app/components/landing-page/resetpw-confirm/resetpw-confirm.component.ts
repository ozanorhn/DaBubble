import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth, confirmPasswordReset, verifyPasswordResetCode } from '@angular/fire/auth';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-resetpw-confirm',
  imports: [FormsModule, CommonModule],
  templateUrl: './resetpw-confirm.component.html',
  styleUrls: ['./resetpw-confirm.component.scss']
})
export class ResetpwConfirmComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  oobCode: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  email: string = '';
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  showMessage: boolean = false;


  constructor(public landing: LandingPageService, private route: ActivatedRoute, private auth: Auth) {}

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
    // Lese den oobCode aus der URL
    this.oobCode = this.route.snapshot.queryParamMap.get('oobCode') || '';
    if (!this.oobCode) {
      this.errorMessage = 'Ungültiger oder fehlender Code.';
    }
  }

  goToLogin(){
    this.landing.landing.set('login')
  }

  async resetPassword()  {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwörter stimmen nicht überein.');
      return;
    }
  
    try {
      await confirmPasswordReset(this.auth, this.oobCode, this.newPassword);
     this.openMessage();
    } catch (err) {
      console.error(err);
      alert('Fehler beim Zurücksetzen des Passworts.');
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
