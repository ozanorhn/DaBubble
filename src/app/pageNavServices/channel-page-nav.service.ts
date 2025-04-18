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
  channel = false;
  thread = false;
  showDirectMessage = false;

  constructor(private router: Router, channelsService: ChannelsService) { }

  navigate() { }

  showNav() {
    return !this.channel && this.mobile && !this.thread || this.mediumScreen && !this.thread || this.bigScreen;
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
    this.hideAddUserPopUp.update(popup => !popup)
  }
}
