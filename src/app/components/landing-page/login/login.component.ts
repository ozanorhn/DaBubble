<<<<<<< HEAD
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandingPageService } from '../../../services/landing-page.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink
  ],
=======
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
>>>>>>> pondy
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
