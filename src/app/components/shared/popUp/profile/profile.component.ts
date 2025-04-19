import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { OverlayUiService } from '../../../../services/profil/overlay-ui-service.service';
@Component({
  selector: 'app-profile',
  imports: [RouterModule, CommonModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private router: Router, private location: Location, private ui:  OverlayUiService) {}
  closeProfile() {
    //this.router.navigate(['/channel']); // oder wohin du zurück möchtest
    //this.router.navigate(['..']);
    this.location.back();
  }

  close() {
    this.ui.closeProfile();
  }

}


