import { Component } from '@angular/core';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  imports: [
    CommonModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  constructor(public overlayService: OverlayService) {

  }

  choiceInput = false

  choice() {
    const allPicker = document.getElementById('all') as HTMLInputElement | null;
    const choiseUser = document.getElementById('choice') as HTMLInputElement | null;
    if (allPicker && choiseUser) {
      allPicker.checked = true;
      choiseUser.checked = false;
      this.choiceInput = false;
    }
  }

  checkAll() {
    const allPicker = document.getElementById('all') as HTMLInputElement | null;
    const choiseUser = document.getElementById('choice') as HTMLInputElement | null;
    if (allPicker && choiseUser) {
      allPicker.checked = false;
      choiseUser.checked = true;
      this.choiceInput = true
    }
  }

}
