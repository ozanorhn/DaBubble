import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../../classes/user.class';
import { ChannelsService } from '../../../services/channels/channels.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-user',
  imports: [
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  currentUser

  constructor(
    public channelService: ChannelsService,
    public localStorageS: LocalStorageService
  ) {
    // console.log('LocalStorage User', this.localStorageS.loadObject('currentUser'));
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
   }

  avatar = [
    { av1: '/assets/imgs/avatar1.svg' },
    { av2: '/assets/imgs/avatar2.svg' },
    { av3: '/assets/imgs/avatar3.svg' },
    { av4: '/assets/imgs/avatar4.svg' },
    { av5: '/assets/imgs/avatar5.svg' },
    { av6: '/assets/imgs/avatar6.svg' },

  ]

  @Input() userInfo!: User;




}
