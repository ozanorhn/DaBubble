import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { OverlayService } from '../../../pageServices/overlays/overlay.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { User } from '../../../classes/user.class';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { UsersService } from '../../../services/users/users.service';


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
 
  isMobile = false;

  constructor(
    public overlayService: OverlayService,
    public localStorageS: LocalStorageService,
    public navService: MainNavService,
    public mainNavService: MainNavService,
    public usersService: UsersService,
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
    if (!this.navService.showChannel()) return;
    this.mainNavService.showAltLogo = !this.mainNavService.showAltLogo;
    this.mainNavService.toggleNav();
  }

  updateIsMobile() {
    this.isMobile = window.innerWidth < 810; // Tailwind "sm" = 640px
  }

 

}
