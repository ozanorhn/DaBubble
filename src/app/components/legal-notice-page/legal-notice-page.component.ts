import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-legal-notice-page',
  imports: [],
  templateUrl: './legal-notice-page.component.html',
  styleUrl: './legal-notice-page.component.scss'
})
export class LegalNoticePageComponent {

  constructor(private location: Location) { }

  goBack() {
    this.location.back(); // Geht genau einen Schritt zurück im Browser-History
  }
}
