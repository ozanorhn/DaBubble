import { Component } from '@angular/core';
import { MembersComponent } from "../members/members.component";
import { EditDescriptionComponent } from "./edit-description/edit-description.component";
import { EditNameComponent } from "./edit-name/edit-name.component";
import { ChannelPageNavService } from '../../../../pageNavServices/channel-page-nav.service';
import { ChannelsService } from '../../../../services/channels/channels.service';

@Component({
  selector: 'app-edit-channel',
  imports: [MembersComponent, EditDescriptionComponent, EditNameComponent],
  templateUrl: './edit-channel.component.html',
  styleUrl: './edit-channel.component.scss'
})
export class EditChannelComponent {


  constructor(public mainService: ChannelPageNavService, public channelService: ChannelsService) {
  
  }





}
