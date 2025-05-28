import { Component, Input } from '@angular/core';
import { User } from '../../../../classes/user.class';


@Component({
  selector: 'app-online-popup',
  imports: [],
  templateUrl: './online-popup.component.html',
  styleUrl: './online-popup.component.scss'
})
export class OnlinePopupComponent {


  @Input() user!: User | null;
  showPopup = false;

  show(user: User) {
    this.user = user;
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 5000); // nach 5 Sekunden ausblenden
  }


}
