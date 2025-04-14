import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { UserComponent } from "../shared/user/user.component";

@Component({
  selector: 'app-channel-page',
  standalone: true,
  imports: [HeaderComponent, UserComponent],
  templateUrl: './channel-page.component.html',
  styleUrl: './channel-page.component.scss'
})
export class ChannelPageComponent {

}
