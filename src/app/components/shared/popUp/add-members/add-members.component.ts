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
  userSearch = '';
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
    this.loadInitialData();
    setInterval(() => {
      this.applyFilters();
    }, 1000);
  }


  loadInitialData() {
    this.applyFilters();
  }


  applyFilters() {
    this.channelMembers = this.channelService.channels[this.channelService.currentIndex()].members;
    this.filterdUsers = this.userService.users.filter(user =>
      !this.channelMembers.some(channelUser => channelUser === user.id)
    );
    this.searchUser()
  }


  searchUser() {
    if (this.userSearch) {
      const searchTerm = this.userSearch.toLowerCase();
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
    this.userSearch = user.name
    this.addMember = user;
    this.dropdownOpen = false;
  }


  onSearchInput() {
    this.applyFilters();
  }




  async addUser() {
    // this.channelService.channels[this.channelService.currentIndex()].members.push();

    console.log('Current Channel', this.channelService.channels[this.channelService.currentIndex()]);

    let channelId: string = this.channelService.channels[this.channelService.currentIndex()].id

    let channelData = this.channelService.channels[this.channelService.currentIndex()]
    channelData.members.push(this.addMember.id)

    await updateDoc(
      doc(this.channelService.channelsCollection, channelId),
      {
        members: channelData.members  // Nur die Mitglieder aktualisieren
      }
      
    );

    this.overlayService.addMembersOverlay()
  }




}
