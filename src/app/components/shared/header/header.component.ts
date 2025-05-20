import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { OverlayService } from '../../../pageServices/overlays/overlay.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { User } from '../../../classes/user.class';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],  // Korrektes Property: styleUrls
})
export class HeaderComponent {
  currentUser
  showAltLogo = false;
  isMobile = false;

  constructor(
    public overlayService: OverlayService,
    public localStorageS: LocalStorageService,
    public navService: MainNavService
  ) {
    // console.log('LocalStorage User', this.localStorageS.loadObject('currentUser'));
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
    this.updateIsMobile(); 
  }
  ngOnInit() {
    window.addEventListener('resize', () => {
      this.updateIsMobile();
    });
  }

  switchLogo() {
    if (!this.isMobile) return;
    this.showAltLogo = !this.showAltLogo;
    this.navService.toggleNav()
  }
  updateIsMobile() {
    this.isMobile = window.innerWidth < 640; // Tailwind "sm" = 640px
  }

 

}
