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
    if (!this.emojis.fav.includes(emoji)) {
      this.emojis.fav.unshift(emoji);
      if (this.emojis.fav.length > 21) {
        this.emojis.fav.pop();
      }
    } else {
      this.emojis.fav.splice(this.emojis.fav.indexOf(emoji), 1);
      this.emojis.fav.unshift(emoji);
    }
    this.saveFavs();
  }


  saveFavs() {
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
      '🫠',
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
