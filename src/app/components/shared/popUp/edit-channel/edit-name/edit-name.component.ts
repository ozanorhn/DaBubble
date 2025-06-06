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
  nameError = false;
  originalName: string = '';

  constructor(public channelService: ChannelsService) {}

  channelNameExists(): boolean {
    const currentChannel = this.channelService.channels[this.channelService.selectedChannelIndex()];
    const newName = currentChannel.name?.trim().toLowerCase();
    
    // Only check for duplicates if the name has actually changed
    if (newName === this.originalName?.trim().toLowerCase()) {
      return false;
    }

    // Check other channels for the same name
    return this.channelService.channels.some(channel => 
      channel.id !== currentChannel.id && // Exclude current channel
      channel.name?.trim().toLowerCase() === newName
    );
  }

  editName() {
    if (!this.edit) {
      // Store original name when entering edit mode
      this.originalName = this.channelService.channels[this.channelService.selectedChannelIndex()].name;
      this.nameError = false;
    } else {
      // Check for duplicates before saving
      if (this.channelNameExists()) {
        this.nameError = true;
        // Revert to original name
        this.channelService.channels[this.channelService.selectedChannelIndex()].name = this.originalName;
        return;
      }
      this.nameError = false;
      this.channelService.updateSelectedChannel();
    }
    this.edit = !this.edit;
  }
}
