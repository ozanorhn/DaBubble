import { Component } from '@angular/core';
import { UserComponent } from '../../user/user.component';

@Component({
  selector: 'app-members',
  imports: [
    UserComponent
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {

}
