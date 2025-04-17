import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [RouterModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private router: Router, private location: Location) {}
  closeProfile() {
    //this.router.navigate(['/channel']); // oder wohin du zurück möchtest
    //this.router.navigate(['..']);
    this.location.back();
  }

}
