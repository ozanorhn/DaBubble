/* import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../shared/directives/clickOutSideDirective';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-channel',
  imports: [CommonModule,ClickOutsideDirective, RouterModule, FormsModule ],
  templateUrl: './add-channel.component.html',
  styleUrl: './add-channel.component.scss'
})
export class AddChannelComponent {
addOption: any;
customName: any;


  constructor(private router: Router) {}
  closeProfile() {
    this.router.navigate(['/channel']); // oder wohin du zurück möchtest
   
  }


  showOverlay = false;

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }

  closeOverlay() {
    this.showOverlay = false;
  }
}
 */