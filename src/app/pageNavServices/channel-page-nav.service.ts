import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelPageNavService {


  addChannelPopUp = signal(false);

  constructor() {}


  addCannelPopup() {
    this.addChannelPopUp.update(popup => !popup);
  }


}
