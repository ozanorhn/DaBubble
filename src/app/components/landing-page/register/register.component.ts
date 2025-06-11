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

  registerData = {
    name: '',
    email: '',
    password: ''
  }

  checkbox = false;
  imageUrl = 'assets/icons/check_box_outline_blank.svg';
  checkboxError = false;

  constructor(
    public landing: LandingPageService,
    public userService: UsersService
  ) { }


  goToAvatar(ngForm: NgForm) {
    if (this.usersAlreadyExsits()) {
      return;
    }

    this.userService.setTempUser({
      name: this.registerData.name,
      email: this.registerData.email,
      password: this.registerData.password
    });

    if (ngForm.valid) {
      this.landing.landing.set('avatar');
    }
  }


  usersAlreadyExsits(): boolean {
    return this.userService.users.some(user => user.email.toLowerCase() === this.registerData.email.toLowerCase());
  }


  resetCheckbox() {
    this.checkbox = false;
    this.imageUrl = 'assets/icons/check_box_outline_blank.svg';
  }


  checkCheckbox() {
    if (this.checkbox == false) {
      this.imageUrl = 'assets/icons/check_box_outline_blank_red.svg';
      this.checkboxError = true;
    } else {
      this.checkboxError = false;
    }
  }


  changeImage() {
    this.checkbox = !this.checkbox;
    this.checkboxError = false;

    if (this.checkbox) {
      this.imageUrl = 'assets/icons/check_box.svg';
    } else {
      this.imageUrl = 'assets/icons/check_box_outline_blank.svg';
    }
  }


  goBack() {
    this.landing.landing.set('login')
  }


}
