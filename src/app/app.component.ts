import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChannelPageNavService } from './pageNavServices/channel-page-nav.service';
import { AsyncPipe } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, // Mark this component as standalone
  imports: [RouterOutlet], // Fix imports section (both RouterOutlet and AsyncPipe)
})
export class AppComponent {
  title = 'dabubble';
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  constructor(private channelPageNavService: ChannelPageNavService) {
    this.channelPageNavService.checkScreenView();
    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.channelPageNavService.checkScreenView();
  }
}
