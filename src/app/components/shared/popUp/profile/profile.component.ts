import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../services/users/users.service';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { LocalStorageService } from '../../../../services/localStorage/local-storage.service';
import { User } from '../../../../classes/user.class';
import { FormsModule } from '@angular/forms';
import { doc, updateDoc } from '@firebase/firestore';
import { MainNavService } from '../../../../pageServices/navigates/main-nav.service';
import { DirectMessagesService } from '../../../../services/directMessages/direct-messages.service';
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
  changeName = '';
  avatars = [1, 2, 3, 4, 5, 6, 7, 8];


  constructor(
    public userService: UsersService,
    public overlayService: OverlayService,
    public localStorageS: LocalStorageService,
    public mainNavService: MainNavService,
    public dmService: DirectMessagesService
  ) {
    this.changeName = this.userService.currentUser.name;
  }


  async editProfile() {
    if (!this.userService.currentUser.id) {
      console.error('No user ID available');
      return;
    }
    const profileData = new User(this.userService.currentUser).toJSON();
    profileData.name = this.changeName;
    profileData.avatar = this.overlayService.profileObj.avatar;
    profileData.password = ''

    try {
      await updateDoc(
        doc(this.userService.usersCollection, this.userService.currentUser.id),
        profileData
      );
      this.localStorageS.saveObject('currentUser', profileData);
      this.userService.currentUser = new User(profileData);
      this.overlayService.profileOverlay(true, profileData);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }


  selectAvatar(i: number) {
    this.overlayService.profileObj.avatar = `assets/imgs/avatar${i}.svg`;
  }


  updateOnlineStatus(user: User) {
    return this.userService.isUserOnline(user.online);
  }

  // checkObj(o): User | undefined{
  //   return this.userService.users.indexOf((u)=> { return u.id == localObj.id})
  // }



  clickToDm(profileObj: User) {
    this.mainNavService.openChannel(true);
    this.dmService.openOrCreateDirectMessageConversation(profileObj);
    this.mainNavService.markedUser(profileObj);
    this.overlayService.profileOverlay(true, this.userService.currentUser)
  }
}