import { Component } from '@angular/core';
import { MembersComponent } from "../members/members.component";
import { EditDescriptionComponent } from "./edit-description/edit-description.component";
import { EditNameComponent } from "./edit-name/edit-name.component";

@Component({
  selector: 'app-edit-channel',
  imports: [MembersComponent, EditDescriptionComponent, EditNameComponent],
  templateUrl: './edit-channel.component.html',
  styleUrl: './edit-channel.component.scss'
})
export class EditChannelComponent {

}
