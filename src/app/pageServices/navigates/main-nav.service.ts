import { computed, Injectable, signal } from '@angular/core';
import { ChannelsService } from '../../services/channels/channels.service';
import { MessagesService } from '../../services/messages/messages.service';
import { User } from '../../classes/user.class';
import { Channel } from '../../classes/channel.class';


@Injectable({
  providedIn: 'root'
})
export class MainNavService {
  mobile = signal(false);
  mediumScreen = signal(false);
  bigScreen = signal(false);
  channel = signal(true);
  thread = signal(false);
  nav = signal(true);
  directMessage = false;
  newMessage = true;
  hideChannelMembers = false;
  showAltLogo = false;
  currentChannelWidth = 0;
  currentThreadWidth = 0;
  amountChannelReactions = signal(4);
  amountThreadReactions = signal(4);
  channelClicked = signal(false);
  selectedUser = new User();
  ChannelMarked = new Channel();


  constructor(
    public channelsService: ChannelsService,
    public messageService: MessagesService
  ) { }


  openNewMessage() {
    this.directMessage = false;
    this.newMessage = true;
  }


  toggleNav() {
    this.nav.set(!this.nav());
    setTimeout(() => {
      if (this.nav()) this.openNav();
      else this.closeNav();
    }, 10);
  }


  /**
   * Closes navigation panel
   */
  closeNav() {
    if (!this.channel() && !this.thread() || this.mediumScreen() && !this.channel()) {
      this.channel.set(true);
    }
    this.nav.set(false);
  }


  /**
   * Opens navigation panel
   */
  openNav() {
    this.nav.set(true);
    if (this.mediumScreen() && this.channel() && this.thread()) {
      this.channel.set(false);
    }
    if (this.mobile()) {
      this.channel.set(false);
      this.thread.set(false);
    }
  }


  /**
   * Determines if navigation should be visible
   * @returns {boolean} Visibility state
   */
  showNav(): boolean {
    return !this.channel() && this.mobile() && !this.thread() && this.nav() || this.mediumScreen() && this.nav() || this.bigScreen() && this.nav();
  }


  /**
  * Determines if channel view should be visible
  * @returns {boolean} Visibility state
  */
  showChannel(): boolean {
    // this.channelIsShown.set(this.channel && this.mobile && !this.thread && !this.nav || this.mediumScreen && this.channel || this.bigScreen)
    return this.channel() && this.mobile() && !this.thread() && !this.nav() || this.mediumScreen() && this.channel() || this.bigScreen();
  }


  /**
  * Determines if thread view should be visible
  * @returns {boolean} Visibility state
  */
  showThread(): boolean {
    // this.threadIsShown.set(!this.channel && this.mobile && this.thread && !this.nav || this.mediumScreen && this.thread || this.bigScreen && this.thread)
    return !this.channel() && this.mobile() && this.thread() && !this.nav() || this.mediumScreen() && this.thread() || this.bigScreen() && this.thread();
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
    this.bigScreen.set(false);
    this.mediumScreen.set(false);
    this.mobile.set(false);
    if (size === 'big') this.bigScreen.set(true);
    if (size === 'medium') this.mediumScreen.set(true);
    if (size === 'mobile') this.mobile.set(true);
  }


  /**
   * Adjusts channel members visibility in header
   */
  setHeaderMembers() {
    if (this.bigScreen()) {
      if (window.innerWidth < 1400 && this.thread()) {
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
    if (this.thread() && this.nav()) {
      this.channel.set(false);
    } else if (!this.nav() && !this.channel() && this.thread()) {
      this.channel.set(true);
    } else {
      this.channel.set(true);
    }
  }


  /**
   * Adjusts layout for mobile screens (<810px)
   */
  adjustMobileScreen() {
    if (this.channel() && this.thread()) {
      this.channel.set(false);
    } else if (this.channel() && this.nav()) {
      this.nav.set(false);
    } else if (!this.channel() && !this.thread()) {
      this.nav.set(true);
    } else if (this.nav() && this.thread()) {
      this.nav.set(false);
    }
  }


  /**
   * Opens channel view
   * @param {boolean} [dm=false] - Whether to open direct messages
   */
  openChannel(dm: boolean = false) {
    this.channelClicked.set(true);
    this.newMessage = false;
    this.channel.set(true);
    this.thread.set(false);
    if (this.mobile()) {
      this.nav.set(false);
      this.showAltLogo = false;
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
    if (this.mobile()) {
      this.channel.set(false);
      this.thread.set(true);
    } else if (this.mediumScreen()) {
      this.thread.set(true);
      this.nav.set(false);
    } else if (this.bigScreen()) {
      this.thread.set(true);
    }
  }


  markedUser(user: User) {
    if (this.selectedUser.name !== user.name) {
      this.selectedUser = user
    } else {
      this.selectedUser = new User();
    }
    this.ChannelMarked = new Channel();
  }


  markedChannel(channel: Channel) {
    if (this.ChannelMarked.name !== channel.name) {
      this.ChannelMarked = channel
    } else {
      this.ChannelMarked = new Channel();
    }
    this.selectedUser = new User();
  }


  toggleEditInput(inputId: string, messageContentId: string) {
    document.getElementById(inputId)?.classList.toggle('d-none');
    document.getElementById(messageContentId)?.classList.toggle('d-none');
  }
}