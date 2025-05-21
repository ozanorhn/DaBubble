import { Component, Input } from '@angular/core';
import { ChannelsService } from '../../../../../services/channels/channels.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-description',
  imports: [FormsModule],
  templateUrl: './edit-description.component.html',
  styleUrl: './edit-description.component.scss'
})
export class EditDescriptionComponent {

  edit = false;

  constructor(public channelService: ChannelsService) { }


  editDescription() {
    this.edit = !this.edit
    if (!this.edit) {
      this.channelService.prepareChannelForEdit();
    }
  }

}
