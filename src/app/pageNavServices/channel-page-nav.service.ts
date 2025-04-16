import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelPageNavService {


  hideAddChannelPopUp = signal(true);

  constructor() { }


  addCannelPopup() {
    this.hideAddChannelPopUp.update(popup => !popup);
  }


  showChannels() {

  }


}
