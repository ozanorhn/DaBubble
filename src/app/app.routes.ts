import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LegalNoticePageComponent } from './components/legal-notice-page/legal-notice-page.component';
import { PrivacyPolicyPageComponent } from './components/privacy-policy-page/privacy-policy-page.component';
import { LoginComponent } from './components/landing-page/login/login.component';


export const routes: Routes = [
    { path: "", component: LandingPageComponent },
    { path: "main", component: MainPageComponent },
    { path: "legal", component: LegalNoticePageComponent },
    { path: "privacy", component: PrivacyPolicyPageComponent },
    { path: 'login', component: LoginComponent },
];
          

 