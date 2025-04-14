import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private router: Router) {}
  closeProfile() {
    this.router.navigate(['/channel']); // oder wohin du zurück möchtest
   
  }

}
