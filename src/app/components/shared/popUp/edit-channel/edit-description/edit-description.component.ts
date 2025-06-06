import { Component } from '@angular/core';
import { ChannelsService } from '../../../../../services/channels/channels.service';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../../../services/users/users.service';

@Component({
  selector: 'app-edit-description',
  imports: [FormsModule],
  templateUrl: './edit-description.component.html',
  styleUrl: './edit-description.component.scss'
})
export class EditDescriptionComponent {

  edit = false;

  constructor(
    public channelService: ChannelsService,
    public userService: UsersService
  ) { }


  editDescription() {
    this.edit = !this.edit
    if (!this.edit) {
      this.channelService.updateSelectedChannel();
    }
  }

}
