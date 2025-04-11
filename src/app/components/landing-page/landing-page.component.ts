import { Component } from '@angular/core';
import { LoginComponent } from "./login/login.component";
import { PasswordComponent } from "./password/password.component";
import { ResetpwConfirmComponent } from "./resetpw-confirm/resetpw-confirm.component";
import { RegisterComponent } from "./register/register.component";

@Component({
  selector: 'app-landing-page',
  imports: [LoginComponent, PasswordComponent, ResetpwConfirmComponent, RegisterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
