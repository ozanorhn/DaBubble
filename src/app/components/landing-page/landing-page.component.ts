import { Component, signal } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpwRequestComponent } from './resetpw-request/resetpw-request.component';
import { ResetpwConfirmComponent } from './resetpw-confirm/resetpw-confirm.component';
import { CommonModule } from '@angular/common';
import { LandingPageService } from '../../services/landing-page.service';

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
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  // landing = signal<string>('login')
  // section = 'login'

  // changeSection(sectionName: Event) {
  //   this.section = sectionName.;
  // }

  showContent = false;
splashDone = false;

ngOnInit() {
  setTimeout(() => {
    this.showContent = true; // Inhalt einblenden
    setTimeout(() => {
      this.splashDone = true; // Splash-Hintergrund ausblenden
    }, 700); // Warte, bis die Slide-Animation vorbei ist
  }, 2000); // Splash-Dauer (Logo in der Mitte)
}

  constructor(public landingService: LandingPageService) {}

  // password(){
  //   let landingContainer = document.getElementById('landing-container');
  //   if (landingContainer) {
  //     landingContainer.innerHTML = '<app-resetpw-confirm></app-resetpw-confirm>';
  //   }
  // }
}
