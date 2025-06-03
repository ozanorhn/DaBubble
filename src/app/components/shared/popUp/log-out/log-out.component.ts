import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { LocalStorageService } from '../../../../services/localStorage/local-storage.service';
import { UsersService } from '../../../../services/users/users.service';
import { DirectMessagesService } from '../../../../services/directMessages/direct-messages.service';

@Component({
  selector: 'app-log-out',
  imports: [RouterLink],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.scss'
})
export class LogOutComponent {

  // currentUser

  constructor(
    public overlayService: OverlayService,
    public usersService: UsersService,
    public localStorageS: LocalStorageService,
    public dmService: DirectMessagesService
  ) { }

  logOut() {
    this.dmService.cleanUpSearchSnapshot()
  }
}
