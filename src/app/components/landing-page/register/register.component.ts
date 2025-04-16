import { Component } from '@angular/core';
import { LandingPageService } from '../../../services/landing-page.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

   constructor(public landing: LandingPageService){
  
    }
    goToLogin(){
      this.landing.landing.set('login')
    }
}
