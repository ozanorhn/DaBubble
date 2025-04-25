import { Component } from '@angular/core';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-avatar',
  imports: [ ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  public currentAvatar: number = 0;

  constructor(public landing: LandingPageService, public userService: UsersService, ){

  }

  changeAvatar(i: number) {
    this.currentAvatar = i;
    console.log('Aktueller Avatar:', this.currentAvatar);
  }

  goBack() {
    this.landing.landing.set('register')
  }

  goForward() {

    this.userService.setTempUser({ avatar: `/assets/imgs/avatar${this.currentAvatar}.svg` });
    this.userService.registerUser(); // add und regist
    this.landing.landing.set('login'); 
    console.log('Konto erstellt');
    
  }
}