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
  directMessage = false;
  newMessage = true;
  hideChannelMembers = false;


  constructor(
    public channelsService: ChannelsService,
    public messageService: MessagesService
  ) { }


  /**
  * Toggles navigation visibility
  */
  // toggleNav() {
  //   if (this.nav) {
  //     this.closeNav();
  //   } else {
  //     this.openNav();
  //   }
  // }

  toggleNav() {
    this.nav = !this.nav;
    // Verzögerung für Animation
    setTimeout(() => {
      if (this.nav) this.openNav();
      else this.closeNav();
    }, 10);
  }


  /**
   * Closes navigation panel
   */
  closeNav() {
    if (!this.channel && !this.thread || this.mediumScreen && !this.channel) {
      this.channel = true;
    }
    this.nav = false;
  }


  /**
   * Opens navigation panel
   */
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


  /**
   * Determines if navigation should be visible
   * @returns {boolean} Visibility state
   */
  showNav(): boolean {
    return !this.channel && this.mobile && !this.thread && this.nav || this.mediumScreen && this.nav || this.bigScreen && this.nav;
  }


  /**
  * Determines if channel view should be visible
  * @returns {boolean} Visibility state
  */
  showChannel(): boolean {
    return this.channel && this.mobile && !this.thread && !this.nav || this.mediumScreen && this.channel || this.bigScreen;
  }


  /**
  * Determines if thread view should be visible
  * @returns {boolean} Visibility state
  */
  showThread(): boolean {
    return !this.channel && this.mobile && this.thread && !this.nav || this.mediumScreen && this.thread || this.bigScreen && this.thread;
  }


  /**
   * Updates responsive layout states based on window size
   * (Called via HostListener in app.component)
   */
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


  /**
    * Sets responsive breakpoint flags
    * @param {'big'|'medium'|'mobile'} size - Current screen size
    */
  setScreen(size: 'big' | 'medium' | 'mobile') {
    this.bigScreen = false;
    this.mediumScreen = false;
    this.mobile = false;
    if (size === 'big') this.bigScreen = true;
    if (size === 'medium') this.mediumScreen = true;
    if (size === 'mobile') this.mobile = true;
  }


  /**
   * Adjusts channel members visibility in header
   */
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


  /**
   * Adjusts layout for medium screens (810-1279px)
   */
  adjustMediumScreen() {
    if (this.thread && this.nav) {
      this.channel = false;
    } else if (!this.nav && !this.channel && this.thread) {
      this.channel = true;
    }
  }


  /**
   * Adjusts layout for mobile screens (<810px)
   */
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


  /**
   * Opens channel view
   * @param {boolean} [dm=false] - Whether to open direct messages
   */
  openChannel(dm: boolean = false) {
    this.newMessage = false;
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


  /**
   * Opens thread view
   */
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
    // this.setHeaderMembers();
  }



  UserMarked = 99999999;
  ChannelMarked = 99999999;

  markedUser(i: number) {
    this.UserMarked = i
    this.ChannelMarked = 99999999;
  }


  markedChannel(i: number) {
    this.ChannelMarked = i
    this.UserMarked = 99999999;
  }


  removeMarker() {
    this.ChannelMarked = 99999999;
    this.UserMarked = 99999999;
  }



}
