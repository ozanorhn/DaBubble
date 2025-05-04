import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { AddUser1Component } from "../shared/popUp/add-user1/add-user1.component";
import { AddChannelComponent } from "../shared/popUp/add-channel/add-channel.component";
import { CommonModule } from '@angular/common';
import { ChannelsService } from '../../services/channels/channels.service';
import { SearchComponent } from "../shared/search/search.component";
import { EditChannelComponent } from "../shared/popUp/edit-channel/edit-channel.component";
import { MainNavService } from '../../pageServices/navigates/main-nav.service';
import { OverlayService } from '../../pageServices/overlays/overlay.service';
import { ThreadComponent } from './thread/thread.component';
import { ChannelComponent } from './channel/channel.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { DirectMessageComponent } from './direct-message/direct-message.component';
import { AddUserComponent } from "../shared/popUp/add-user/add-user.component";
import { ProfileComponent } from "../shared/popUp/profile/profile.component";
import { LogOutComponent } from "../shared/popUp/log-out/log-out.component";
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { User } from '../../classes/user.class';

@Component({
  selector: 'app-main-page',
  imports: [
    HeaderComponent,
    NavigationComponent,
    AddChannelComponent,
    CommonModule,
    SearchComponent,
    EditChannelComponent,
    ThreadComponent,
    ChannelComponent,
    NewMessageComponent,
    DirectMessageComponent,
    AddUserComponent,
    ProfileComponent,
    LogOutComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  showMessagesOnly = false;



  // dummyThreatService = {
  //   messages: [{
  //     id: 'string',
  //     message: 'string',
  //     sender: 'Florian Rauh',
  //     timestamp: 12,
  //     createdBy: 'string',
  //     reactions: [{
  //       id: 0,
  //       users: ['Sandra Peters'],
  //     }],
  //     threadId: 'string',
  //     channelId: 'string',
  //   }],
  //   chatMessage: {
  //     id: 'string',
  //     message: 'string',
  //     sender: 'Florian Rauh',
  //     timestamp: 12,
  //     createdBy: 'string',
  //     reactions: [{
  //       id: 0,
  //       users: ['Sandra Peters'],
  //     }],
  //     threadId: 'string',
  //     channelId: 'string',
  //   }
  // }

  currentUser

  constructor(
    public mainNavService: MainNavService,
    public channelService: ChannelsService,
    public overlayService: OverlayService,
    public localStorageS: LocalStorageService
  ) {
    console.log('LocalStorage User', this.localStorageS.loadObject('currentUser'));
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
  }


  toggleMessagesView() {
    this.showMessagesOnly = !this.showMessagesOnly;
  }
}
