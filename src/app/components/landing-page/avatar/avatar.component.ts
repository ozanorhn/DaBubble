import { Component } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  public currentAvatar: number = 0;

  changeAvatar(i: number) {
    this.currentAvatar = i;
  }

  goBack() {

  }

  goForward() {
    
  }
}
