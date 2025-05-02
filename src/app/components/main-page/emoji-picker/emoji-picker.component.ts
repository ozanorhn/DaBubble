import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-emoji-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, PickerModule],  // RICHTIGER IMPORT!
  templateUrl: './emoji-picker.component.html',
})
export class EmojiPickerComponent {
  @Input() visible = false;
  @Output() emojiSelected = new EventEmitter<string>();

  addEmoji(event: any) {
    const emoji = event.emoji.native;
    this.emojiSelected.emit(emoji);
    console.log('Ausgewähltes Emoji:', emoji);
  }
}
