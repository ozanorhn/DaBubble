import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { OverlayService } from '../../../pageServices/overlays/overlay.service';
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
 
  isMobile = false;

  constructor(
    public overlayService: OverlayService,
    public navService: MainNavService,
    public mainNavService: MainNavService,
    public usersService: UsersService
  ) {
    this.updateIsMobile(); 
  }
  ngOnInit() {
    window.addEventListener('resize', () => {
      this.updateIsMobile();
    });
  }

  switchLogo() {
    // if (!this.navService.showChannel()) return;
    this.mainNavService.showAltLogo = !this.mainNavService.showAltLogo;
    this.mainNavService.toggleNav();
  }

  updateIsMobile() {
    this.isMobile = window.innerWidth < 810; // Tailwind "sm" = 640px
  }

 

}
