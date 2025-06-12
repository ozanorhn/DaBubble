import { Component } from '@angular/core';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';
import { UsersService } from '../../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { LoadingScreenComponent } from "../../shared/loading-screen/loading-screen.component";

@Component({
  selector: 'app-avatar',
  imports: [CommonModule, LoadingScreenComponent],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})

export class AvatarComponent {
  currentAvatar: number = 0;
  showMessage: boolean = false;
  userName: string = '';
  messageText: string = '';

  isLoadingAvatar = false;

  constructor(
    public landing: LandingPageService,
    public userService: UsersService,
    public authService: AuthService
  ) {
    const tempUser = this.userService.getTempUser();
    this.userName = tempUser?.name ?? '';
  }

  changeAvatar(i: number) {
    this.currentAvatar = i;
  }

  goBack() {
    this.landing.landing.set('register');
  }


  openMessage(message: string) {
    this.messageText = message;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000); // Overlay wird 5 Sek. angezeigt
  }

  async goForward() {
    this.userService.setTempUser({
      avatar: `assets/imgs/avatar${this.currentAvatar}.svg`,
    });

    try {
      await this.authService.completeUserRegistration();
      this.openMessage('Bestätigungs-E-Mail gesendet. Bitte Postfach prüfen.');
      this.isLoadingAvatar = true;
      setTimeout(() => {
        this.isLoadingAvatar = false;
        this.landing.landing.set('login');
      }, 2000);
    } catch (error) {
      console.error('Registrierung fehlgeschlagen:', error);
      this.openMessage('Registrierung fehlgeschlagen.');
    }
  }
}