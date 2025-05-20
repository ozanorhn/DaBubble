import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { UserComponent } from '../../user/user.component';
import { UsersService } from '../../../../services/users/users.service';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { ChannelsService } from '../../../../services/channels/channels.service';
import { User } from '../../../../classes/user.class';

@Component({
  selector: 'app-members',
  imports: [
    UserComponent
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {


  members = signal<string[]>([]);
  // membersArray: User[] = []

  // membersArray = signal<User[]>([]);



  filteredUsers = computed(() =>
    this.usersService.users.filter(user =>
      this.members().includes(user.id)
    )
  );

  constructor(
    public usersService: UsersService,
    public overlayService: OverlayService,
    public channelService: ChannelsService
  ) {

    // effect(() => {
    //   console.log('Next Channel', this.channelService.currentIndex());
    //   try {
    //     this.members.set(this.channelService.channels[this.channelService.currentIndex()].members);
    //   } catch (error) {
    //     console.log('No Members');
    //   }
    //   this.membersArray.set(this.usersService.users.filter(user =>
    //     this.members().includes(user.id)))
    // })
  }


  getUser(user: User | undefined): User {
    if (user) {
      return user
    } else {
      return new User();
    }
  }


}
