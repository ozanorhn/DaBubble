import { Component } from '@angular/core';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';

@Component({
  selector: 'app-confirm-leave-channel',
  imports: [],
  templateUrl: './confirm-leave-channel.component.html',
  styleUrl: './confirm-leave-channel.component.scss'
})
export class ConfirmLeaveChannelComponent {

  constructor(
    public overlayService: OverlayService
  ){

  }

}
