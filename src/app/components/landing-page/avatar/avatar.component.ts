import { Component } from '@angular/core';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';
import { UsersService } from '../../../services/users/users.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  public currentAvatar: number = 0;
  public showMessage: boolean = false;

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
  
    console.log('Konto erstellt');
    this.openMessage();

   
    setTimeout(() => {
    this.landing.landing.set('login');
    }, 3000); // Navigation erfolgt nach 5 Sek.
  }

  openMessage(){
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000); // Overlay wird 5 Sek. angezeigt
  }
 
}