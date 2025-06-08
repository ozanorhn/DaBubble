import { Component } from '@angular/core';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users/users.service';
import { FormsModule, NgForm } from '@angular/forms';

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


  goToAvatar(ngForm: NgForm) {
    this.userService.setTempUser({
      name: this.name,
      email: this.email,
      password: this.password
    });
    if (ngForm.valid && ngForm.submitted) {
      this.landing.landing.set('avatar');
    }
  }


  goBack() {
    this.landing.landing.set('login')
  }




  // onSubmit(ngForm: NgForm) {
  // this.goToAvatar()
  // }

}
