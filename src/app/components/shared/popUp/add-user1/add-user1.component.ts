import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChannelPageNavService } from '../../../../pageNavServices/channel-page-nav.service';

@Component({
  selector: 'app-add-user1',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-user1.component.html',
  styleUrls: ['./add-user1.component.scss']
})
export class AddUser1Component {
  addOption: string | undefined;
  customName: string | undefined;

  showOverlay = false;
  constructor(public channelNavService: ChannelPageNavService) {}

  toggleOverlay(): void {
    this.showOverlay = !this.showOverlay;
  }

  /* closeOverlay(): void {
    this.showOverlay = false;
  } */

  // Optional: Falls du Navigation brauchst
  // constructor(private router: Router) {}
  // closeProfile() {
  //   this.router.navigate(['/channel']);
  // }

  closeOverlay() {
    this.channelNavService.addUserPopup(); // toggelt das Signal
  }
}
