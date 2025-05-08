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
    SearchComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],  // Korrektes Property: styleUrls
})
export class HeaderComponent {
  currentUser

  constructor(
    public overlayService: OverlayService,
    public localStorageS: LocalStorageService,
    public navService: MainNavService
  ) {
    // console.log('LocalStorage User', this.localStorageS.loadObject('currentUser'));
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
  }

}
