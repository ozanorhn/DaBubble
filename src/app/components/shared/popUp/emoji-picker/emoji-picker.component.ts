import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-emoji-picker',
  imports: [CommonModule],
  templateUrl: './emoji-picker.component.html',
  styleUrl: './emoji-picker.component.scss'
})
export class EmojiPickerComponent {
  emojiCategory: 'fav' | 'faces' | 'signs' | 'hands' = 'faces';

  changeEmojiCat(n: 'fav' | 'faces' | 'signs' | 'hands') {
    this.emojiCategory = n;
    this.currentEmojicategory = this.emojis[`${n}`];
  }


  emojis = {
    fav: [],
    faces: [
      {
        value: '😀',
        id: 'face_0'
      },
      {
        value: '😃',
        id: 'face_1'
      },
      {
        value: '😄',
        id: 'face_2'
      },
      {
        value: '😁',
        id: 'face_3'
      },
      {
        value: '😆',
        id: 'face_4'
      },
      {
        value: '😅',
        id: 'face_5'
      },
      {
        value: '🤣',
        id: 'face_6'
      },
      {
        value: '😂',
        id: 'face_7'
      },
      {
        value: '🙂',
        id: 'face_8'
      },
      {
        value: '😉',
        id: 'face_9'
      },
      {
        value: '😊',
        id: 'face_10'
      },
      {
        value: '😇',
        id: 'face_11'
      },
      {
        value: '😇',
        id: 'face_12'
      },
      {
        value: '😋',
        id: 'face_13'
      },
      {
        value: '🤪',
        id: 'face_14'
      },
      {
        value: '🤗',
        id: 'face_15'
      },
      {
        value: '🤫',
        id: 'face_16'
      },
      {
        value: '🤔',
        id: 'face_17'
      },
      {
        value: '🫡',
        id: 'face_18'
      },
      {
        value: '😎',
        id: 'face_19'
      },
      {
        value: '🤓',
        id: 'face_20'
      }
    ],
    signs: [
      {
        value: '✅',
        id: 'sign_0'
      },
      {
        value: '☎️',
        id: 'sign_1'
      },
      {
        value: '🔋',
        id: 'sign_2'
      },
      {
        value: '🪫',
        id: 'sign_3'
      },
      {
        value: '📁',
        id: 'sign_4'
      },
      {
        value: '📋',
        id: 'sign_5'
      },
      {
        value: '📨',
        id: 'sign_6'
      },
      {
        value: '🔍',
        id: 'sign_7'
      },
      {
        value: '💡',
        id: 'sign_8'
      },
      {
        value: '🔒',
        id: 'sign_9'
      },
      {
        value: '🔓',
        id: 'sign_10'
      },
      {
        value: '🚀',
        id: 'sign_11'
      },
      {
        value: '🌋',
        id: 'sign_12'
      },
      {
        value: '❗',
        id: 'sign_13'
      },
      {
        value: '❓',
        id: 'sign_14'
      },
      {
        value: '🆗',
        id: 'sign_15'
      },
      {
        value: '❌',
        id: 'sign_16'
      },
      {
        value: '💯',
        id: 'sign_17'
      },
      {
        value: '💭',
        id: 'sign_18'
      },
      {
        value: '💤',
        id: 'sign_19'
      },
      {
        value: '💥',
        id: 'sign_20'
      }
    ],
 hands: [
      {
        value: '👍',
        id: 'sign_0'
      },
      {
        value: '👋',
        id: 'sign_1'
      },
      {
        value: '👆',
        id: 'sign_2'
      },
      {
        value: '🫷',
        id: 'sign_3'
      },
      {
        value: '🙏',
        id: 'sign_4'
      },
      {
        value: '💪',
        id: 'sign_5'
      },
      {
        value: '👈',
        id: 'sign_6'
      },
      {
        value: '👉',
        id: 'sign_7'
      },
      {
        value: '✌️',
        id: 'sign_8'
      },
      {
        value: '👐',
        id: 'sign_9'
      },
      {
        value: '🫶',
        id: 'sign_10'
      },
      {
        value: '👏',
        id: 'sign_11'
      },
      {
        value: '🙌',
        id: 'sign_12'
      },
      {
        value: '🤝',
        id: 'sign_13'
      },
      {
        value: '👇',
        id: 'sign_14'
      },
      {
        value: '🤌',
        id: 'sign_15'
      },
      {
        value: '🤏',
        id: 'sign_16'
      },
      {
        value: '🤞',
        id: 'sign_17'
      },
      {
        value: '🫵',
        id: 'sign_18'
      },
      {
        value: '👊',
        id: 'sign_19'
      },
      {
        value: '✍️',
        id: 'sign_20'
      }
    ]
  }

  currentEmojicategory = this.emojis.faces;

}
