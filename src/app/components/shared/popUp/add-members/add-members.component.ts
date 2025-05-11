import { Component } from '@angular/core';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';

@Component({
  selector: 'app-add-members',
  imports: [],
  templateUrl: './add-members.component.html',
  styleUrl: './add-members.component.scss'
})
export class AddMembersComponent {

  constructor(
    public overlayService: OverlayService
  ){
    
  }

}
