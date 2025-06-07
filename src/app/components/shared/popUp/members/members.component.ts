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

  filteredUsers = computed(() =>
    this.usersService.users.filter(user =>
      this.members().includes(user.id)
    )
  );

  constructor(
    public usersService: UsersService,
    public overlayService: OverlayService,
    public channelService: ChannelsService
  ) { }


  getUser(user: User | undefined): User {
    if (user) {
      return user
    } else {
      return new User();
    }
  }


  getUserObj(userId: string): User {
    return this.usersService.users.find((u) => u.id === userId) || new User();
  }


  get currentChannelMembers(): string[] {
    const channels = this.channelService.channels;
    const index = this.channelService.selectedChannelIndex();
    return channels?.[index]?.members ?? [];
  }


}
