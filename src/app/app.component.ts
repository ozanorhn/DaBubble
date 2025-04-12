import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from "./components/shared/popUp/profile/profile.component";
import { LogOutComponent } from "./components/shared/popUp/log-out/log-out.component";
import { MembersComponent } from "./components/shared/popUp/members/members.component";
import { AddUserComponent } from "./components/shared/popUp/add-user/add-user.component";


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProfileComponent,
    LogOutComponent,
    MembersComponent,
    AddUserComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dabubble';
}
