import { Component } from '@angular/core';
import { ChannelsService } from '../../../../services/channels/channels.service';


@Component({
  selector: 'app-channels',
  imports: [],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss'
})
export class ChannelsComponent {


  constructor(public channelService: ChannelsService){}

  // channels = [
  //   {name : 'Entwicklerteam'},
  //   {name: 'Frontend'},
  //   {name: 'Backend'},
  //   {name: 'DevOps'},
  //   {name: 'Design-Team'},
  //   {name : 'Office-team'},
  //   {name: 'Support'},
  // ]



  turnCannelArrow() {
    let arrow = document.getElementById('channel-arrow');
    arrow?.classList.toggle('-rotate-90');

    let list = document.getElementById('dropList');
    list?.classList.toggle('hidden');
  }




}
