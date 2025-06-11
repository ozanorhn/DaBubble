import { Component } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpwRequestComponent } from './resetpw-request/resetpw-request.component';
import { ResetpwConfirmComponent } from './resetpw-confirm/resetpw-confirm.component';
import { CommonModule } from '@angular/common';
import { LandingPageService } from '../../pageServices/navigates/landing-nav.service';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../classes/user.class';
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
  showSplash = true;

  constructor(
    public landingService: LandingPageService,
    private route: ActivatedRoute,
    public landing: LandingPageService,
    public authService: AuthService,
    public usersService: UsersService,
    private router: Router
  ) {
    const lastVisitedComponent = sessionStorage.getItem('lastVisitedComponent');
    if (lastVisitedComponent !== 'landing') {
      if (localStorage.getItem('currentUser') !== null) {
        authService.loadCurrentUserFromStorage();
        router.navigate(['/main']);
      } else {
        usersService.currentUser = new User();
      }
    }
    usersService.componentExsits = true;
    let id = setTimeout(() => {
      sessionStorage.setItem('lastVisitedComponent', 'landing');
      clearTimeout(id);
    }, 100);
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
      this.showSplash = false;
    }, 2000);


    const reloaded = sessionStorage.getItem('reloaded');
    if (reloaded === 'true') {
      this.showSplash = false;
    }
  }


  goToRegister() {
    this.landing.landing.set('register')
  }
}