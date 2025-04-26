import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayUiService } from '../../../../services/profil/overlay-ui-service.service';
import { UsersService } from '../../../../services/users/users.service';

@Component({
  selector: 'app-edit-profil',
  imports: [],
  templateUrl: './edit-profil.component.html',
  styleUrl: './edit-profil.component.scss'
})
export class EditProfilComponent {
  avatarUrl: string = '';


  constructor(private router: Router, public ui: OverlayUiService,   private userService: UsersService ) {}


  ngOnInit(): void {
    const user = this.userService.getTempUser();
    this.avatarUrl = user.avatar ?? '/assets/imgs/avatar1.svg'; //avatar
  }

  closeProfile() {
    this.router.navigate(['/channel']); // oder wohin du zurück möchtest
   
  }

  closeOverlay() {
    this.ui.closeEditProfile();
  }
}
