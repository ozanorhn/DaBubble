import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LogOutMobileComponent } from "../popUp/log-out-mobile/log-out-mobile.component";
import { SearchComponent } from "../search/search.component";
import { ProfileComponent } from "../popUp/profile/profile.component";
import { OverlayUiService } from '../../../services/profil/overlay-ui-service.service';
import { EditProfilComponent } from "../popUp/edit-profil/edit-profil.component";



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LogOutMobileComponent, SearchComponent, ProfileComponent, EditProfilComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  showOverlay = false;
  isMobile = false;


constructor(public ui: OverlayUiService, private router: Router) {} 

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }

  closeOverlay() {
    this.showOverlay = false;
  }

  updateMobileStatus() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit() {
    this.updateMobileStatus();
    window.addEventListener('resize', this.updateMobileStatus.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateMobileStatus.bind(this));
  }

  openProfileOverlay() {
    this.ui.openProfile();
  }

  logout() {
    this.showOverlay = false;         // Overlay schließen
    this.ui.closeProfile();           // falls Profile Overlay offen ist
    this.ui.closeEditProfile();       // falls Edit Overlay offen ist
    this.router.navigate(['/login']); // zur Loginseite weiterleiten
  }
}
