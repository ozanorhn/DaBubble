import { Component, Input } from '@angular/core';
import { ChannelsService } from '../../../../../services/channels/channels.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-name',
  imports: [FormsModule],
  templateUrl: './edit-name.component.html',
  styleUrl: './edit-name.component.scss'
})
export class EditNameComponent {



  edit = false;

  constructor(public channelService: ChannelsService) {

  }


  editName() {
    this.edit = !this.edit
    this.channelService.edit();
  }
}
