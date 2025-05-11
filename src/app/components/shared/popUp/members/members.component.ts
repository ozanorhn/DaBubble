import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../../user/user.component';
import { UsersService } from '../../../../services/users/users.service';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { ChannelsService } from '../../../../services/channels/channels.service';

@Component({
  selector: 'app-members',
  imports: [
    UserComponent
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent implements OnInit{

  members: string[] = [];

  constructor(
    public usersService: UsersService,
    public overlayService: OverlayService,
    public channelService: ChannelsService
  ) {

    console.log('Index from channels', this.channelService.currentIndex());
    console.log('Array from current Channel', this.channelService.channels[this.channelService.currentIndex()].members);
    this.members = this.channelService.channels[this.channelService.currentIndex()].members

    console.log(this.filterUsers());
  }

  ngOnInit(): void {
    this.filterUsers()
  }

  filterUsers() {
    return this.usersService.users.filter(user => 
      this.members.includes(user.id)
    );
  }


}
