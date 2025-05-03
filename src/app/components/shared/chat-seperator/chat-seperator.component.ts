import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-seperator',
  imports: [],
  templateUrl: './chat-seperator.component.html',
  styleUrl: './chat-seperator.component.scss'
})
export class ChatSeperatorComponent {
  @Input() date: string | void = '';
}
