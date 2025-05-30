import { Component } from '@angular/core';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public name = '';
  public email = '';
  public password = '';

  constructor(
    public landing: LandingPageService,
    public userService: UsersService
  ) { }


  goToAvatar() {
    this.userService.setTempUser({
      name: this.name,
      email: this.email,
      password: this.password
    });

    this.landing.landing.set('avatar');
  }

  
  goBack() {
    this.landing.landing.set('login')
  }

}
