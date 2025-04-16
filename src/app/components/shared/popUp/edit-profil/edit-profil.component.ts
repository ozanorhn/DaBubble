import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profil',
  imports: [],
  templateUrl: './edit-profil.component.html',
  styleUrl: './edit-profil.component.scss'
})
export class EditProfilComponent {


  constructor(private router: Router) {}
  closeProfile() {
    this.router.navigate(['/channel']); // oder wohin du zurück möchtest
   
  }
}
