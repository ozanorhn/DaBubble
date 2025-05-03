import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavService } from './pageServices/navigates/main-nav.service';





@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dabubble';

  constructor(private mainNavService: MainNavService) {
    this.mainNavService.checkScreenView();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.mainNavService.checkScreenView();
  }
}