import { Component, OnInit } from '@angular/core';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { UsersService } from '../../../../services/users/users.service';
import { User } from '../../../../classes/user.class';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../../user/user.component';
import { FormsModule } from '@angular/forms';
import { ChannelsService } from '../../../../services/channels/channels.service';
import { doc, updateDoc } from '@firebase/firestore';

@Component({
  selector: 'app-add-members',
  imports: [
    CommonModule,
    UserComponent,
    FormsModule
  ],
  templateUrl: './add-members.component.html',
  styleUrl: './add-members.component.scss'
})

export class AddMembersComponent implements OnInit {

  filteredMembers: User[] = [];    // Gefilterte Liste (Channel + Suche)
  filterdUsers: User[] = [];
  userSearchInput = '';
  channelMembers: string[] = [];
  userExist = false;
  dropdownOpen = false;
  addMember = new User();

  constructor(
    public overlayService: OverlayService,
    public userService: UsersService,
    public channelService: ChannelsService
  ) { }


  ngOnInit(): void {
    let id = setTimeout(() => {
      this.loadInitialData();
      clearTimeout(id);
    }, 1000);
  }


  loadInitialData() {
    this.applyFilters();
  }


  applyFilters() {
    this.channelMembers = this.channelService.channels[this.channelService.selectedChannelIndex()]?.members;
    this.filterdUsers = this.userService.users.filter(user =>
      !this.channelMembers.some(channelUser => channelUser === user.id)
    );
    this.searchUser();
  }


  searchUser() {
    if (this.userSearchInput) {
      const searchTerm = this.userSearchInput.toLowerCase();
      this.filterdUsers = this.filterdUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm)
      );
    }
    this.filteredMembers = this.filterdUsers;
    this.isUserExist();
    this.isDropdownOpen();
  }


  isUserExist() {
    if (this.filteredMembers.length > 0) {
      this.userExist = true;
    } else {
      this.userExist = false;
    }
  }


  isDropdownOpen() {
    if (this.userExist) {
      this.dropdownOpen = true;
    } else {
      this.dropdownOpen = false;
    }
  }


  choiceUser(user: User) {
    this.userSearchInput = user.name
    this.addMember = user;
    this.dropdownOpen = false;
  }


  onSearchInput() {
    this.applyFilters();
  }


  async addUser() {
    let channelId: string = this.channelService.channels[this.channelService.selectedChannelIndex()].id
    let channelData = this.channelService.channels[this.channelService.selectedChannelIndex()]
    channelData.members.push(this.addMember.id)
    await updateDoc(
      doc(this.channelService.channelsCollection, channelId),
      {
        members: channelData.members
      }
    );
    this.overlayService.addMembersOverlay();
    this.userSearchInput = '';
  }


  get currentChannelName(): string | null {
  const index = this.channelService.selectedChannelIndex();
  const channels = this.channelService.channels;
  return channels && channels[index] ? channels[index].name : null;
}


}
