import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelPageNavService {


  hideAddChannelPopUp = signal(true);

  hideAddUserPopUp = signal(true);

  constructor() { }


  addCannelPopup() {
    this.hideAddChannelPopUp.update(popup => !popup);
  }


  addUserPopup() {
    this.hideAddUserPopUp.update(popup => !popup)
  }


}
