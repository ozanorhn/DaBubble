import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { ThreadsComponent } from "../channel-page/navigation/navigation.component";

@Component({
  selector: 'app-main-page',
  imports: [
    HeaderComponent,
    ThreadsComponent
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
