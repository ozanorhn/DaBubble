import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user1',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-user1.component.html',
  styleUrl: './add-user1.component.scss'
})
export class AddUser1Component {

  addOption: any;
  customName: any;

  showOverlay = false;

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }

  closeOverlay() {
    this.showOverlay = false;
  }

  // closeProfile() {
  //   this.router.navigate(['/channel']); // oder wohin du zurück möchtest
   
  // }

}
