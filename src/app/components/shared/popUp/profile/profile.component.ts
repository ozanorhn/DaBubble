import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { OverlayUiService } from '../../../../services/profil/overlay-ui-service.service';
import { UsersService } from '../../../../services/users/users.service';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
@Component({
  selector: 'app-profile',
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  avatarUrl: string = '';
  name: string = '';
  email: string = '';

  constructor(
    public userService: UsersService,
    private router: Router,
    private location: Location,
    private ui: OverlayUiService,
    public overlayService: OverlayService) { }

  ngOnInit() {
    const user = this.userService.getTempUser();
    this.avatarUrl = user.avatar ?? '/assets/imgs/avatar1.svg';
    this.name = user.name ?? '';
    this.email = user.email ?? '';
  }

  closeProfile() {
    //this.router.navigate(['/channel']); // oder wohin du zurück möchtest
    //this.router.navigate(['..']);
    // this.location.back();
  }

  close() {
    this.ui.closeProfile();
  }

  openEditProfileOverlay() {
    this.ui.closeProfile();
    this.ui.openEditProfile();
  }

}


