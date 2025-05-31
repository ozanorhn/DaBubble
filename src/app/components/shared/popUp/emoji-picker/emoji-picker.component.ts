import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { EmojisService } from '../../../../services/emojis/emojis.service';

@Component({
  selector: 'app-emoji-picker',
  imports: [CommonModule],
  templateUrl: './emoji-picker.component.html',
  styleUrl: './emoji-picker.component.scss'
})
export class EmojiPickerComponent {
  emojiCategory: 'fav' | 'faces' | 'signs' | 'hands' = 'faces';
  @Output() emojiPicked = new EventEmitter<string>();
  currentEmojicategory;

  constructor(
    public emojisService: EmojisService
  ) {
    this.currentEmojicategory = this.emojisService.emojis.faces;
  }


  changeEmojiCategory(n: 'fav' | 'faces' | 'signs' | 'hands') {
    this.emojiCategory = n;
    this.currentEmojicategory = this.emojisService.emojis[`${n}`];
  }


  pickEmoji(emoji: string) {
    this.emojisService.addEmojiToFav(emoji)
    this.emojiPicked.emit(emoji);
  }
}