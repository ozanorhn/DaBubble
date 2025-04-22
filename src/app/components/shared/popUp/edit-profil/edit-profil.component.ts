import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayUiService } from '../../../../services/profil/overlay-ui-service.service';

@Component({
  selector: 'app-edit-profil',
  imports: [],
  templateUrl: './edit-profil.component.html',
  styleUrl: './edit-profil.component.scss'
})
export class EditProfilComponent {


  constructor(private router: Router, public ui: OverlayUiService) {}
  closeProfile() {
    this.router.navigate(['/channel']); // oder wohin du zurück möchtest
   
  }

  closeOverlay() {
    this.ui.closeEditProfile();
  }
}
