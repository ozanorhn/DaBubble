/* import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './chat-page.component.html', 
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {



showOverlay = false;
messages: string[] = [''];
newMessage: string = '';

sendMessage() {
  if (this.newMessage.trim()) {
    this.messages.push(this.newMessage.trim());
    this.newMessage = '';
  }
}

toggleOverlay() {
  this.showOverlay = !this.showOverlay;
}

closeOverlay() {
  this.showOverlay = false;
}
isOwnMessage(msg: string): boolean {
  // Platzhalter-Logik – später vielleicht User-ID vergleichen
  return msg.includes('Danke'); 
}
}
 */