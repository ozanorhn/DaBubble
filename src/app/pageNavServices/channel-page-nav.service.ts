import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelsService } from '../services/channels/channels.service';
import { UsersService } from '../services/users/users.service';

import { Channel } from '../classes/channel.class';


@Injectable({
  providedIn: 'root'
})
export class ChannelPageNavService {
  mobile = false;
  mediumScreen = false;
  bigScreen = false;
  channel = true;
  thread = false;
  nav = true;
  directMessage = true;
  hideChannelMembers = false;

  hideAddChannelPopUp = signal(true);
  hideAddUserPopUp = signal(true);
  hideEditChannelPopUp = signal(true);

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





  constructor(private router: Router,public channelsService: ChannelsService) { }

  navigate() { }

  toggleNav() {
    if (this.nav) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }

  closeNav() {
    if (!this.channel && !this.thread || this.mediumScreen && !this.channel) {
      this.channel = true;
    }
    this.nav = false;
  }

  openNav() {
    this.nav = true;
    if (this.mediumScreen && this.channel && this.thread) {
      this.channel = false;
    }
    if (this.mobile) {
      this.channel = false;
      this.thread = false;
    }
  }

  showNav() {
    return !this.channel && this.mobile && !this.thread && this.nav || this.mediumScreen && this.nav || this.bigScreen && this.nav;
  }

  showChannel() {
    return this.channel && this.mobile && !this.thread && !this.nav || this.mediumScreen && this.channel || this.bigScreen;
  }

  showThread() {
    return !this.channel && this.mobile && this.thread && !this.nav || this.mediumScreen && this.thread || this.bigScreen && this.thread;
  }

  // Runs in a Hostlistener in app.component.ts
  checkScreenView() {
    if (window.innerWidth >= 1280) {
      this.setScreen('big');
      this.setHeaderMembers();
    } else if (window.innerWidth >= 810) {
      this.setScreen('medium');
      this.adjustMediumScreen();
    } else {
      this.setScreen('mobile');
      this.adjustMobileScreen();
    }
  }

  setScreen(size: 'big' | 'medium' | 'mobile') {
    this.bigScreen = false;
    this.mediumScreen = false;
    this.mobile = false;
    if (size === 'big') this.bigScreen = true;
    if (size === 'medium') this.mediumScreen = true;
    if (size === 'mobile') this.mobile = true;
  }

  setHeaderMembers() {
    if (this.bigScreen) {
      if (window.innerWidth < 1400 && this.thread) {
        this.hideChannelMembers = true;
      } else {
        this.hideChannelMembers = false;
      }
    } else {
      this.hideChannelMembers = false;
    }
  }


  adjustMediumScreen() {
    if (this.thread && this.nav) {
      this.channel = false;
    } else if (!this.nav && !this.channel && this.thread) {
      this.channel = true;
    }
  }


  adjustMobileScreen() {
    if (this.channel && this.thread) {
      this.channel = false;
    } else if (this.channel && this.nav) {
      this.nav = false;
    } else if (!this.channel && !this.thread) {
      this.nav = true;
    } else if (this.nav && this.thread) {
      this.nav = false;
    }
  }

  openChannel(dm = false) {
    this.channel = true;
    this.thread = false;
    if (this.mobile) {
      this.nav = false
    }
    if (dm) {
      this.directMessage = true;
    } else {
      this.directMessage = false;
    }
    this.setHeaderMembers();
  }

  openThread() {
    if (this.mobile) {
      this.channel = false;
      this.thread = true;
    } else if (this.mediumScreen) {
      this.thread = true;
      this.nav = false;
    } else if (this.bigScreen) {
      this.thread = true;
    }
    this.setHeaderMembers();
  }

  editMessage(id: number, chatType: string) {
    console.log(chatType, id);
    
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


  newChannel = {
    name: '',
    description: '',
  }
  


  createChannel() {
    this.channelsService.channels.push(new Channel(this.newChannel));
    this.channelsService.addChannel(new Channel(this.newChannel));
  }

}
