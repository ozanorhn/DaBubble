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
export class MembersComponent implements OnInit {


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
    // this.members.set(this.channelService.channels[this.channelService.currentIndex()].members)

    // effect(() => {
    //   console.log('Members Array:', this.members());
    // });

    this.members.set(this.getCurrentMembers());

    // Reagiere auf Änderungen in Channels oder Index
    effect(() => {
      this.members.set(this.getCurrentMembers());
    });
  }

  private getCurrentMembers(): string[] {
    return this.channelService.channels[this.channelService.currentIndex()].members || [];
  }

  ngOnInit(): void {

    setInterval(() => {
      console.log('filterd Members Array', this.filteredUsers());

    }, 1000)


  }






}
