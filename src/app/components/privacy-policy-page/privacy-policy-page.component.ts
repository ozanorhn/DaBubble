import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy-page.component.html',
  styleUrl: './privacy-policy-page.component.scss'
})
export class PrivacyPolicyPageComponent {

    constructor(private location: Location) { }

  goBack() {
    this.location.back(); // Geht genau einen Schritt zurück im Browser-History
  }

}
