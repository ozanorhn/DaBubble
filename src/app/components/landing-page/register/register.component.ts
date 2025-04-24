import { Component } from '@angular/core';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

   constructor(public landing: LandingPageService, public userService: UsersService){
  
    }
    goToLogin(){
      this.landing.landing.set('login')
    }
}
