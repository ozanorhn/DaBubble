import { Component } from '@angular/core';
import { LandingPageService } from '../../../pageServices/navigates/landing-nav.service';

@Component({
  selector: 'app-resetpw-confirm',
  imports: [],
  templateUrl: './resetpw-confirm.component.html',
  styleUrl: './resetpw-confirm.component.scss'
})
export class ResetpwConfirmComponent {
   constructor(public landing: LandingPageService){}

}
