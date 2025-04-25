import { Injectable } from '@angular/core';
import { ChannelsService } from '../../services/channels/channels.service';
import { MessagesService } from '../../services/messages/messages.service';


@Injectable({
  providedIn: 'root'
})
export class MainNavService {
  mobile = false;
  mediumScreen = false;
  bigScreen = false;
  channel = true;
  thread = false;
  nav = true;
  directMessage = true;
  hideChannelMembers = false;


  constructor(
    public channelsService: ChannelsService,
    public messageService: MessagesService) { }


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

 
}
