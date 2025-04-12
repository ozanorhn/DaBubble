import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';




@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dabubble';
}
