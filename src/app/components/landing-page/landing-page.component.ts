import { Component } from '@angular/core';
import { AvatarComponent } from './avatar/avatar.component';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ResetpwRequestComponent } from "./resetpw-request/resetpw-request.component";
import { ResetpwConfirmComponent } from "./resetpw-confirm/resetpw-confirm.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [AvatarComponent, LoginComponent, RegisterComponent, ResetpwRequestComponent, ResetpwConfirmComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {}
