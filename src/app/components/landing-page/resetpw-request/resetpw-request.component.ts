import { Component } from '@angular/core';
import { LandingPageService } from '../../../pageNavServices/landing-page.service';

@Component({
  selector: 'app-resetpw-request',
  imports: [],
  templateUrl: './resetpw-request.component.html',
  styleUrl: './resetpw-request.component.scss'
})
export class ResetpwRequestComponent {
  constructor(public landing: LandingPageService) { }

  goToLogin(){
    this.landing.landing.set('login')
  }
}
