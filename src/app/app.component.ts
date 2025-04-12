import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from "./components/shared/popUp/profile/profile.component";
import { LogOutComponent } from "./components/shared/popUp/log-out/log-out.component";
import { MembersComponent } from "./components/shared/popUp/members/members.component";
import { AddUserComponent } from "./components/shared/popUp/add-user/add-user.component";
import { AvatarComponent } from "./components/landing-page/avatar/avatar.component";


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dabubble';
}
