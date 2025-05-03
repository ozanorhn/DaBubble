import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../services/users/users.service';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { LocalStorageService } from '../../../../services/localStorage/local-storage.service';
import { User } from '../../../../classes/user.class';
@Component({
  selector: 'app-profile',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  avatarUrl: string = '';
  name: string = '';
  email: string = '';

  editProfil = false;
  // usersProfil = false;

  currentUser

  constructor(
    public userService: UsersService,
    public overlayService: OverlayService,
    public localStorageS: LocalStorageService
  ) {
    console.log('LocalStorage User', this.localStorageS.loadObject('currentUser'));
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
  }




  ngOnInit() {
    // const user = this.userService.getTempUser();
    // this.avatarUrl = user.avatar ?? '/assets/imgs/avatar1.svg';
    // this.name = user.name ?? '';
    // this.email = user.email ?? '';

console.log('LocalStorage User 2',  this.currentUser);

  }

  // closeProfile() {
  //   //this.router.navigate(['/channel']); // oder wohin du zurück möchtest
  //   //this.router.navigate(['..']);
  //   // this.location.back();
  // }

  // close() {
  //   this.ui.closeProfile();
  // }

  // openEditProfileOverlay() {
  //   this.ui.closeProfile();
  //   this.ui.openEditProfile();
  // }



  editProfile() {
    this.editProfil = !this.editProfil
  }

}


