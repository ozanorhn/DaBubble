import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelsService } from '../services/channels/channels.service';
import { UsersService } from '../services/users/users.service';



@Injectable({
  providedIn: 'root'
})
export class ChannelPageNavService {
  mobile = false;
  mediumScreen = false;
  bigScreen = false;
  channel = false;
  thread = false;
  nav = true;
  showDirectMessage = false;


  searchValue = signal('')

  users = inject(UsersService);
  channels = inject(ChannelsService);

  channelArray = this.channels.channels
  userArray = this.users.users


  filteredResults = computed(() => {
    const searchTerm = this.searchValue().toLowerCase();
    if (searchTerm.startsWith('@')) {
      return this.filterUsers(searchTerm)
    }
    else if (searchTerm.startsWith('#')) {
      return this.filterChannels(searchTerm)
    }
    else {
      return this.filterAll(searchTerm)
    }
  });


  filterUsers(searchTerm: string) {
    const userSearch = searchTerm.substring(1);
    return this.userArray.filter(user =>
      user.name.toLowerCase().includes(userSearch)
    )
  }

  filterChannels(searchTerm: string) {
    const channelSearch = searchTerm.substring(1);
    return this.channelArray.filter(channel =>
      channel.name.toLowerCase().includes(channelSearch)
    )
  }

  filterAll(searchTerm: string) {
    const userResults = this.userArray.filter(user =>
      user.name.toLowerCase().includes(searchTerm)
    )
    const channelResults = this.channelArray.filter(channel =>
      channel.name.toLowerCase().includes(searchTerm)
    )
    return [...userResults, ...channelResults];
  }





  constructor(private router: Router, channelsService: ChannelsService) { }

  navigate() { }

  showNav() {
    return !this.channel && this.mobile && !this.thread && this.nav || this.mediumScreen && !this.thread && this.nav || this.bigScreen && this.nav;
  }

  toggleNav() {
    if (this.nav) {
      this.nav = false;
    } else {
      this.nav = true;
    }
  }

  showChannel() {
    return this.channel && this.mobile && !this.thread || this.mediumScreen || this.bigScreen;
  }

  showThread() {
    return !this.channel && this.mobile && this.thread || this.mediumScreen && this.thread || this.bigScreen && this.thread;
  }

  checkScreenView() {
    if (window.innerWidth >= 1280) {
      if (!this.bigScreen) console.log('bigScreen');
      this.bigScreen = true;
      this.mediumScreen = false;
      this.mobile = false;
    } else if (window.innerWidth >= 810) {
      if (!this.mediumScreen) console.log('mediumScreen');
      this.bigScreen = false;
      this.mediumScreen = true;
      this.mobile = false;
    } else {
      if (!this.mobile) console.log('mobile');
      this.bigScreen = false;
      this.mediumScreen = false;
      this.mobile = true;
      if (this.channel && this.thread) {
        this.channel = false;
      }
    }
  }

  hideAddChannelPopUp = signal(true);
  hideAddUserPopUp = signal(true);
  hideEditChannelPopUp = signal(true);

  openChannel() {
    this.channel = true;
    this.thread = false;
  }

  openThread() {
    if (this.mobile) {
      this.channel = false;
      this.thread = true;
    } else if (this.mediumScreen || this.bigScreen) {
      this.channel = true;
      this.thread = true;
    }
  }

  addCannelPopup() {
    this.hideAddChannelPopUp.update(popup => !popup);
  }

  addUserPopup() {
    this.hideAddUserPopUp.update(popup => !popup);
  }

  editChannelPopup() {
    this.hideEditChannelPopUp.update(popup => !popup);
  }
}
