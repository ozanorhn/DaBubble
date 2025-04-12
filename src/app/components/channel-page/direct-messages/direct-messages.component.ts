import { Component } from '@angular/core';
import { UserComponent } from "../../shared/user/user.component";

@Component({
  selector: 'app-direct-messages',
  imports: [UserComponent],
  templateUrl: './direct-messages.component.html',
  styleUrl: './direct-messages.component.scss'
})
export class DirectMessagesComponent {

}
