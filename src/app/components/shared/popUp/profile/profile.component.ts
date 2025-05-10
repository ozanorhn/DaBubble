import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../services/users/users.service';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { LocalStorageService } from '../../../../services/localStorage/local-storage.service';
import { User } from '../../../../classes/user.class';
import { FormsModule } from '@angular/forms';
import { doc, updateDoc } from '@firebase/firestore';
@Component({
  selector: 'app-profile',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  editProfil = false;
  usersProfil = false;
  currentUser
  changeName = '';

  constructor(
    public userService: UsersService,
    public overlayService: OverlayService,
    public localStorageS: LocalStorageService
  ) {
    const storedUser = this.localStorageS.loadObject('currentUser');
    this.currentUser = new User(storedUser);
    this.changeName = this.currentUser.name;
  }


  async editProfile() {
    if (!this.currentUser?.id) {
      console.error('No user ID available');
      return;
    }
    const profileData = this.currentUser.toJSON();
    profileData.name = this.changeName;
    profileData.password = ''
    console.log(profileData);

    try {
      await updateDoc(
        doc(this.userService.usersCollection, this.currentUser.id),
        profileData
      );
      this.localStorageS.saveObject('currentUser', this.currentUser);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }


}


