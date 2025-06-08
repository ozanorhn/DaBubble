import { Component } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpwRequestComponent } from './resetpw-request/resetpw-request.component';
import { ResetpwConfirmComponent } from './resetpw-confirm/resetpw-confirm.component';
import { CommonModule } from '@angular/common';
import { LandingPageService } from '../../pageServices/navigates/landing-nav.service';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
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

  constructor(
    public landingService: LandingPageService,
    private route: ActivatedRoute,
    public landing: LandingPageService,
    public authService: AuthService
  ) {

  }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      const fullPath = urlSegments.map(seg => seg.path).join('/');
      if (fullPath === 'confirm-password') {
        this.landingService.landing.set('confirm');
      } else if (fullPath === 'login') {
        this.landingService.landing.set('login');
      } else if (fullPath === 'register') {
        this.landingService.landing.set('register');
      }
    });

    setTimeout(() => {
      this.showContent = true;
      setTimeout(() => {
        this.showSplash = false;
      }, 700);
    }, 950);

    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navEntries.length > 0 && navEntries[0].type === 'reload') {
      console.log('Seite wurde neu geladen (Browser-Refresh)');
      this.showSplash = false;
    } else {
      console.log('Normale Navigation (kein Reload)');
      this.showSplash = true;
    }


    // const splashShown = localStorage.getItem('splashShown');
    // if (splashShown === 'true') {
    //   this.showSplash = false; // Nicht mehr anzeigen
    // } else {
    //   localStorage.setItem('splashShown', 'true'); // Als "gezeigt" markieren
    //   this.showSplash = true; // Einmalig anzeigen
    // }

  }


  goToRegister() {
    this.landing.landing.set('register')
  }
}
