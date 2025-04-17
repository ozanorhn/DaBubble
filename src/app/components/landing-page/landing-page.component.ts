import { Component } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpwRequestComponent } from './resetpw-request/resetpw-request.component';
import { ResetpwConfirmComponent } from './resetpw-confirm/resetpw-confirm.component';
import { CommonModule } from '@angular/common';
import { LandingPageService } from '../../pageNavServices/landing-page.service';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    AvatarComponent,
    LoginComponent,
    RegisterComponent,
    ResetpwRequestComponent,
    ResetpwConfirmComponent,
    CommonModule,
    SplashScreenComponent,
    RouterLink
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  showContent = false;
  showSplash = true;

  constructor(public landingService: LandingPageService) {}

  ngOnInit() {
    setTimeout(() => {
      this.showContent = true;
      setTimeout(() => {
        this.showSplash = false;
      }, 700); 
    }, 3000); 
  }
}
