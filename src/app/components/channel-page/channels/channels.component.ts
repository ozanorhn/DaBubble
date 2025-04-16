import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-channels',
  imports: [ RouterModule],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss'
})
export class ChannelsComponent {

  toggleDropDown() {
    let arrow = document.getElementById('droparrow');
    arrow?.classList.toggle('-rotate-90');

    let list = document.getElementById('dropList');
    list?.classList.toggle('hidden');
  }

}
