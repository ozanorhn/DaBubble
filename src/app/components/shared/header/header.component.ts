import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
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


constructor(public ui: OverlayUiService) {} 

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
}
