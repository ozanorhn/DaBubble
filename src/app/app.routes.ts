import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ChannelPageComponent } from './components/channel-page/channel-page.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';


export const routes: Routes = [
    { path: "", component: LandingPageComponent },
    { path: "channel", component: ChannelPageComponent },
    { path: "chat", component: ChatPageComponent },
    { path: "main", component: MainPageComponent }
];
          

