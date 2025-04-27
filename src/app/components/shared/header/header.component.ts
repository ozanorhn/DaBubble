import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LogOutMobileComponent } from "../popUp/log-out-mobile/log-out-mobile.component";
import { SearchComponent } from "../search/search.component";
import { ProfileComponent } from "../popUp/profile/profile.component";
import { OverlayUiService } from '../../../services/profil/overlay-ui-service.service';
import { EditProfilComponent } from "../popUp/edit-profil/edit-profil.component";
import { UsersService } from '../../../services/users/users.service';
import { OverlayService } from '../../../pageServices/overlays/overlay.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],  // Korrektes Property: styleUrls
})
export class HeaderComponent implements OnInit, OnDestroy {
  showOverlay = false;
  isMobile = false;
  avatarUrl: string = '';

  constructor(public ui: OverlayUiService, private userService: UsersService, public overlayService: OverlayService) {}

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

    const user = this.userService.getTempUser();
    this.avatarUrl = user.avatar ?? '/assets/imgs/avatar1.svg'; // Avatar setzen
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateMobileStatus.bind(this));
  }

  openProfileOverlay() {
    this.ui.openProfile();
  }

  logout() {
    this.showOverlay = false; // Overlay schließen
    this.ui.closeProfile(); // falls Profile Overlay offen ist
    this.ui.closeEditProfile(); // falls Edit Overlay offen ist
    // this.router.navigate(['']); // zur Landing-page weiterleiten
  }
}
