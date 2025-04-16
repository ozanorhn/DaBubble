import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ChannelPageComponent } from './components/channel-page/channel-page.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ProfileComponent } from './components/shared/popUp/profile/profile.component';
import { EditProfilComponent } from './components/shared/popUp/edit-profil/edit-profil.component';
import { LoginComponent } from './components/landing-page/login/login.component';

export const routes: Routes = [

    { path: "", component: LandingPageComponent },
    { path: "channel", component: ChannelPageComponent },
    { path: "chat", component: ChatPageComponent },
    { path: "contact", component: ContactPageComponent },
    { path: "imprint", component: ContactPageComponent },
    { path: "privacy", component: ContactPageComponent },
    { path: "profile", component: ProfileComponent },
    { path: "edit-profil", component: EditProfilComponent },
    { path: "login", component: LoginComponent  },
];


