import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelsService } from '../services/channels/channels.service';

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
  showDirectMessage = false;


  constructor(private router: Router, channelsService: ChannelsService) { }

  navigate() { }

  toggleNav() {
    if (this.nav) {
      if (!this.channel && !this.thread || this.mediumScreen && !this.channel) {
        this.channel = true;
      }
      this.nav = false;
    } else {
      this.nav = true;
      if (this.mediumScreen && this.channel && this.thread) {
        this.channel = false;
      }
      if (this.mobile) {
        this.channel = false;
        this.thread = false;
      }
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

  checkScreenView() {
    if (window.innerWidth >= 1280) {
      this.setScreen('big');
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

  hideAddChannelPopUp = signal(true);

  hideAddUserPopUp = signal(true);

  openChannel() {
    this.channel = true;
    this.thread = false;
    if (this.mobile) {
      this.nav = false
    }
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
  }

  addCannelPopup() {
    this.hideAddChannelPopUp.update(popup => !popup);
  }


  addUserPopup() {
    this.hideAddUserPopUp.update(popup => !popup)
  }
}
