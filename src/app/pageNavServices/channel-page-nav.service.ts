import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelPageNavService {


  addChannelPopUp = signal(true);

  constructor() {}


  addCannelPopup() {
    this.addChannelPopUp.update(popup => !popup);
  }


}
