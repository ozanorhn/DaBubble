import { Component } from '@angular/core';

@Component({
  selector: 'app-channels',
  imports: [],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss'
})
export class ChannelsComponent {

  toggleDropDown() {
    let list = document.getElementById('dropList');
    list?.classList.toggle('hidden');

    let arrow = document.getElementById('droparrow');
    arrow?.classList.toggle('-rotate-90')
  }

}
