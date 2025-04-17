import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChannelPageNavService {
  mobile = false;
  showChannel = false;
  showThread = false;
  showDirectMessage = false;
  hideAddChannelPopUp = signal(true);
  hideAddUserPopUp = signal(true);

  constructor(private router: Router) { }

  navigate() {
    if (window.innerWidth >= 1024) {
      this.router.navigate(['/desktop-page'])
    } else {
      this.router.navigate(['/chat'])
    }
  }

  openChannel() {
    if (this.mobile) {
      this.showChannel = true;
      this.showThread = false;
    }
  }

  openThread() {
    if (this.mobile) {
      this.showChannel = false;
      this.showThread = true;
    }
  }

  addCannelPopup() {
    this.hideAddChannelPopUp.update(popup => !popup);
  }


  addUserPopup() {
    this.hideAddUserPopUp.update(popup => !popup)
  }


}
