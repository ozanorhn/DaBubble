import { AfterViewInit, Component, effect, ElementRef, HostListener, ViewChild } from '@angular/core';
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
import { MembersComponent } from "../shared/popUp/members/members.component";
import { AddMembersComponent } from "../shared/popUp/add-members/add-members.component";
import { LoadingScreenComponent } from '../shared/loading-screen/loading-screen.component';
import { ConfirmLeaveChannelComponent } from "../shared/popUp/confirm-leave-channel/confirm-leave-channel.component";
import { OnlinePopupComponent } from "../shared/popUp/online-popup/online-popup.component";
import { UsersService } from '../../services/users/users.service';
import { DevspaceBtnComponent } from '../shared/devspace-btn/devspace-btn.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


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
    LoadingScreenComponent,
    ConfirmLeaveChannelComponent,
    OnlinePopupComponent,
    DevspaceBtnComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements AfterViewInit {
  showMessagesOnly = false;
  // currentUser
  isMobile = false;

  @ViewChild('channel') channelRef?: ElementRef;
  @ViewChild('thread', { read: ElementRef }) threadRef?: ElementRef;
  @ViewChild(OnlinePopupComponent) onlinePopup!: OnlinePopupComponent;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setReactionsAmount();
  }

  private setReactionsAmount() {
    const channelWidth = this.channelRef?.nativeElement?.offsetWidth - 160;
    const threadWidth = this.threadRef?.nativeElement?.offsetWidth - 160;
    this.navService.currentChannelWidth = channelWidth ?? 0;
    this.navService.currentThreadWidth = threadWidth ?? 0;
    this.navService.amountChannelReactions.set(Math.floor((channelWidth ?? 0) / 73));
    this.navService.amountThreadReactions.set(Math.floor((threadWidth ?? 0) / 73));
    if (this.navService.amountChannelReactions() > 20) this.navService.amountChannelReactions.set(20);
    if (this.navService.amountThreadReactions() > 20) this.navService.amountThreadReactions.set(20);
  }

  constructor(
    public mainNavService: MainNavService,
    public channelService: ChannelsService,
    public overlayService: OverlayService,
    public localStorageS: LocalStorageService,
    public navService: MainNavService,
    public userService: UsersService,
    public authService: AuthService,
    private router: Router
  ) {
    if (!userService.currentUser.name || userService.currentUser.name === 'gast') {
      localStorageS.remove('currentUser');
      this.router.navigate(['/']);
    }
    this.updateIsMobile();
    effect(() => {
      const showChannel = this.navService.channel();
      const showThread = this.navService.thread();
      let id = setTimeout(() => {
        this.setReactionsAmount();
        clearTimeout(id);
      }, 100);
    });
  }


  ngAfterViewInit(): void {
    this.setReactionsAmount();
  }


  ngOnInit() {
    window.addEventListener('resize', () => {
      this.updateIsMobile();
    });

    // Zeige das Popup wenn jemand neu online geht:
    this.userService.setOnlinePopupCallback((user) => {
      if (this.onlinePopup) {
        this.onlinePopup.show(user);
      }
    });
    this.channelService.setupChannelsListener()
  }


  toggleMessagesView() {
    this.showMessagesOnly = !this.showMessagesOnly;
  }



  switchContent() {
    if (!this.isMobile) return;
    this.mainNavService.showAltLogo = false;
    this.mainNavService.toggleNav();

    this.mainNavService.directMessage = false;
    this.mainNavService.newMessage = true;
    this.mainNavService.channel.set(false);
    this.mainNavService.thread.set(false);
  }




  updateIsMobile() {
    this.isMobile = window.innerWidth < 640; // Tailwind "sm" = 640px
    if (!this.isMobile) {
      this.mainNavService.showAltLogo = false;
    }
  }


}
