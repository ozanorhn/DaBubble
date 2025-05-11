import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { UserComponent } from '../../user/user.component';
import { UsersService } from '../../../../services/users/users.service';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { ChannelsService } from '../../../../services/channels/channels.service';
import { interval } from 'rxjs';

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
  ) {
    this.members.set(this.getCurrentMembers());
    effect(() => {
      this.members.set(this.getCurrentMembers());
    });
  }

  private getCurrentMembers(): string[] {
    return this.channelService.channels[this.channelService.currentIndex()].members || [];
  }

}
