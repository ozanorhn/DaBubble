import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmojisService {

  constructor() {
    this.emojis.fav = this.loadFavs();
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
}
