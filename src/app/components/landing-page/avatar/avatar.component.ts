import { Component } from '@angular/core';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  public currentAvatar: number = 0;

  constructor(public landing: LandingPageService){

  }

  changeAvatar(i: number) {
    this.currentAvatar = i;
  }

  goBack() {
    this.landing.landing.set('register')
  }

  goForward() {
    console.log('Konto erstellt');
    
  }
}