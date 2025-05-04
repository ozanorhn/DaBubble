import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { LocalStorageService } from '../../../../services/localStorage/local-storage.service';
import { User } from '../../../../classes/user.class';

@Component({
  selector: 'app-log-out',
  imports: [RouterLink],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.scss'
})
export class LogOutComponent {

  currentUser

  constructor(
    public overlayService: OverlayService,
    public localStorageS: LocalStorageService
  ) {
    console.log('LocalStorage User', this.localStorageS.loadObject('currentUser'));
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
  }

}
