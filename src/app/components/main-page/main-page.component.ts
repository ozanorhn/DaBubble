import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';
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
import { MembersComponent } from "../shared/popUp/members/members.component";
import { AddMembersComponent } from "../shared/popUp/add-members/add-members.component";
import { LoadingScreenComponent } from '../shared/loading-screen/loading-screen.component';

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
    LogOutComponent,
    MembersComponent,
    AddMembersComponent,
    LoadingScreenComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  showMessagesOnly = false;
  currentUser
  showAltLogo = false;
  isMobile = false;

  constructor(
    public mainNavService: MainNavService,
    public channelService: ChannelsService,
    public overlayService: OverlayService,
    public localStorageS: LocalStorageService,
    public navService: MainNavService
  ) {
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
    this.updateIsMobile();
  }


  ngOnInit() {
    window.addEventListener('resize', () => {
      this.updateIsMobile();
    });
  }


  toggleMessagesView() {
    this.showMessagesOnly = !this.showMessagesOnly;
  }


  switchContent() {
    if (!this.isMobile) return;
    this.showAltLogo = !this.showAltLogo;
    this.navService.toggleNav()
  }


  updateIsMobile() {
    this.isMobile = window.innerWidth < 640; // Tailwind "sm" = 640px
    if (!this.isMobile) {
      this.showAltLogo = false;
    }
  }

  
}
