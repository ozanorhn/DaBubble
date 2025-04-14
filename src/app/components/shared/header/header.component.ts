import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClickOutsideDirective } from '../directives/clickOutSideDirective';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,ClickOutsideDirective, RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showOverlay = false;

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }

  closeOverlay() {
    this.showOverlay = false;
  }
}

