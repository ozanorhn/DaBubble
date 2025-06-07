import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LegalNoticePageComponent } from './components/legal-notice-page/legal-notice-page.component';
import { PrivacyPolicyPageComponent } from './components/privacy-policy-page/privacy-policy-page.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';



export const routes: Routes = [
    { path: "", component: LandingPageComponent },
    {
        path: "main",
        loadComponent: () => import('./components/main-page/main-page.component')
            .then(m => m.MainPageComponent)
    },
    { path: "legal", component: LegalNoticePageComponent },
    { path: "privacy", component: PrivacyPolicyPageComponent },
    { path: 'confirm-password', component: ConfirmEmailComponent },
    { path: '**', redirectTo: '' }
];


