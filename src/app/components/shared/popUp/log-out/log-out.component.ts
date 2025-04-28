import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';

@Component({
  selector: 'app-log-out',
  imports: [RouterLink],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.scss'
})
export class LogOutComponent {

  constructor(public overlayService: OverlayService){

  }

}
