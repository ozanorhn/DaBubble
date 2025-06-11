import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { LocalStorageService } from '../../../../services/localStorage/local-storage.service';
import { User } from '../../../../classes/user.class';
import { UsersService } from '../../../../services/users/users.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-log-out',
  imports: [RouterLink],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.scss'
})
export class LogOutComponent {

  constructor(
    public overlayService: OverlayService,
    public localStorageS: LocalStorageService,
    public usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) { }

  logOut() {
    this.overlayService.logoutOvelay();
    this.usersService.componentExsits = false;
    this.usersService.currentUser = new User();
    this.authService.isLoggedIn.set(false);
    let id = setTimeout(() => {
      this.router.navigate(['/']);
      clearTimeout(id);
    }, 100);
  }
}
