import { Component } from '@angular/core';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';

@Component({
  selector: 'app-devspace-btn',
  imports: [],
  templateUrl: './devspace-btn.component.html',
  styleUrl: './devspace-btn.component.scss'
})
export class DevspaceBtnComponent {

  constructor(public mainNavService: MainNavService){

  }

}
