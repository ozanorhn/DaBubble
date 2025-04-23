import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

 
  constructor(public landing: LandingPageService) {}

  change(){
    this.landing.landing.set('request')
  }
  
  goToRegister(){
    this.landing.landing.set('register')
  }

}
