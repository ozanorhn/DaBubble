import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-emoji-picker',
  imports: [CommonModule],
  templateUrl: './emoji-picker.component.html',
  styleUrl: './emoji-picker.component.scss'
})
export class EmojiPickerComponent {
  emojiCategory: 'fav' | 'faces' | 'signs' | 'hands' = 'faces';
  @Output() emojiPicked = new EventEmitter<string>();


  constructor() {
    this.emojis.fav = this.loadFavs();
  }


  changeEmojiCat(n: 'fav' | 'faces' | 'signs' | 'hands') {
    this.emojiCategory = n;
    this.currentEmojicategory = this.emojis[`${n}`];
  }


  pickEmoji(emoji: string) {
    this.addEmojiToFav(emoji)
    this.emojiPicked.emit(emoji);
  }


  addEmojiToFav(emoji: string) {
    this.emojis.fav.unshift(emoji);
    if (this.emojis.fav.length > 20) {
      this.emojis.fav.pop();
    }
    this.saveFavs();
  }


  saveFavs() {
    console.log(this.emojis.fav);
    localStorage.setItem('emojiFav', JSON.stringify(this.emojis.fav))
  }


  loadFavs() {
    if (localStorage.getItem('emojiFav') !== null) {
      return JSON.parse(localStorage.getItem('emojiFav') as string)
    } else {
      return [
        '✅',
        '👍'
      ];
    }
  }


  emojis = {
    fav: [
      '✅',
      '👍'
    ],
    faces: [
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '🤣',
      '😂',
      '🙂',
      '😉',
      '😊',
      '😇',
      '😇',
      '😋',
      '🤪',
      '🤗',
      '🤫',
      '🤔',
      '🫡',
      '😎',
      '🤓'],
    signs: [
      '✅',
      '☎️',
      '🔋',
      '🪫',
      '📁',
      '📋',
      '📨',
      '🔍',
      '💡',
      '🔒',
      '🔓',
      '🚀',
      '🌋',
      '❗',
      '❓',
      '🆗',
      '❌',
      '💯',
      '💭',
      '💤',
      '💥'],
    hands: [
      '👍',
      '👋',
      '👆',
      '🫷',
      '🙏',
      '💪',
      '👈',
      '👉',
      '✌️',
      '👐',
      '🫶',
      '👏',
      '🙌',
      '🤝',
      '👇',
      '🤌',
      '🤏',
      '🤞',
      '🫵',
      '👊',
      '✍️']
  }

  currentEmojicategory = this.emojis.faces;

}
