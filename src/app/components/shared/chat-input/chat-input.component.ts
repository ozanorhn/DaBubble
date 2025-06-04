import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
  effect
} from '@angular/core';
import { MessagesService } from '../../../services/messages/messages.service';
import { ThreadsService } from '../../../services/threads/threads.service';
import { DirectMessagesService } from '../../../services/directMessages/direct-messages.service';
import { FormsModule } from '@angular/forms';
import { ThreadMessagesService } from '../../../services/threadMessages/thread-messages.service';
import { Message } from '../../../classes/message.class';
import { DM } from '../../../interfaces/dm';
import { EmojiPickerComponent } from "../popUp/emoji-picker/emoji-picker.component";
import { FilterService } from '../../../pageServices/filters/filter.service';
import { UserComponent } from "../user/user.component";
import { User } from '../../../classes/user.class';
import { Channel } from '../../../classes/channel.class';
import { MainNavService } from '../../../pageServices/navigates/main-nav.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { Timestamp } from '@angular/fire/firestore';
import { addDoc, arrayUnion, doc, getDoc, updateDoc } from '@firebase/firestore';

@Component({
  selector: 'app-chat-input',
  imports: [FormsModule, EmojiPickerComponent, UserComponent],
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {
  @ViewChild('messageInput') messageInputRef!: ElementRef;
  @ViewChild('messageEditInput') messageEditInputRef!: ElementRef;
  @Input() chatType: 'new' | 'thread' | 'dm' | 'channel' = 'new';
  @Input() edit: boolean = false;
  @Input() message: Message | DM = new Message();
  @Input() index: number = 0;
  @Output() saveClicked = new EventEmitter<void>();

  showEmojiPiucker = false;
  editText: string = '';
  showEmojiPicker = false;

  newMessageText = '';
  currentUser;

  constructor(
    public messageService: MessagesService,
    public threadService: ThreadsService,
    public directMessageService: DirectMessagesService,
    public threadMessagesService: ThreadMessagesService,
    public filterService: FilterService,
    public navService: MainNavService,
    public localStorageS: LocalStorageService,
    public dmService: DirectMessagesService
  ) {
    effect(() => {
      const channelClicked = this.navService.channelClicked();
      const dmClicked = this.directMessageService.dmClicked();
      if (navService.channelClicked() || directMessageService.dmClicked()) {
        navService.channelClicked.set(false);
        directMessageService.dmClicked.set(false);
        let id = setTimeout(() => {
          this.focusInput();
          clearTimeout(id);
        }, 100);
      }
    });
    let id = setTimeout(() => {
      this.focusInput();
      clearTimeout(id);
    }, 100);


    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
  }


  focusInput() {
    this.messageInputRef.nativeElement.focus();
  }

  toggleEmojiPicker() {
    this.showEmojiPiucker = this.showEmojiPiucker === true ? false : true;
  }


  ngOnInit(): void {
    this.editText = this.message.message;
  }

  addEmoji(emoji: string) {
    if (this.edit) {
      this.editText += emoji;
    } else {
      switch (this.chatType) {
        case 'channel':
          this.messageService.messageInput += emoji;
          break;
        case 'thread':
          this.threadService.threadMessage.message += emoji;
          break;
        case 'dm':
          this.directMessageService.newMessage.message += emoji;
          break;
        case 'new':
          this.newMessageText += emoji;
          break;
        default:
          break;
      }
    }
    this.toggleEmojiPicker();
  }



  isUser(item: any): item is User {
    return 'name' in item && 'avatar' in item; // Anpassen an Ihre User-Properties
  }

  isChannel(item: any): item is Channel {
    return 'name' in item && 'id' in item; // Anpassen an Ihre Channel-Properties
  }



  sendMessage(): void {
    switch (this.chatType) {
      case 'channel':
        if (this.edit) {
          this.message.message = this.editText;
          this.messageService.editMessage(this.message as Message);
          this.saveClicked.emit();
        } else {
          this.messageService.sendMessage();
        }
        break;
      case 'thread':
        if (this.edit) {
          this.threadService.currentThread().content[this.index].message = this.editText;
          this.threadService.updateThread(true);
          this.saveClicked.emit();
        } else if (this.threadService.chatType === 'channel') {
          this.messageService.updateThread();
        } else {
          this.directMessageService.updateThread();
        }
        break;
      case 'dm':
        if (this.edit) {
          this.directMessageService.directMessage.content[this.index].message = this.editText;
          this.directMessageService.updateDM('');
          this.saveClicked.emit();
        } else {
          this.directMessageService.sendDirectMessage();
        }
        break;
      case 'new':
        console.log('Message', this.newMessageText);

        this.filterService.newMessageChannels.forEach(channel => {
          this.sendNewMessages(this.newMessageText, channel)
        });

        this.filterService.newMessagePersons.forEach((person) => {
          this.checkExistingIdsAddMessage(this.newMessageText, person)
        });


        this.newMessageText = '';
        this.filterService.newMessageChannels = [];
        this.filterService.newMessagePersons = [];
        break;
    }

    if (!this.edit) {
      this.focusInput();
    }
  }

  focusEditInput(): void {
    if (this.edit && this.messageEditInputRef) {
      this.messageEditInputRef.nativeElement.focus();
    }
  }


  async sendNewMessages(messageInput: string, channel: Channel) {
    const newMessage = new Message(); // Erstelle eine neue Message-Instanz
    if (this.currentUser.id) newMessage.sender = this.currentUser.id;
    newMessage.timestamp = Timestamp.now();
    newMessage.message = messageInput;
    newMessage.channelId = channel.id; // Direkt auf die id-Eigenschaft zugreifen

    try {
      await addDoc(this.messageService.messageCollection, newMessage.toJSON());
    } catch (error) {
      console.error('Error adding message', error);
    }
  }


  // async checkExistingIdsAddMessage(messageInput: string, person: User) {
  //   const dmIdUser1First = this.dmService.getDirectMessageId(person.id, this.currentUser.id);
  //   const dmIdUser2First = this.dmService.getDirectMessageId(this.currentUser.id, person.id);
  //   const dmDocRefUser1First = doc(this.dmService.directMessageCollection, dmIdUser1First);
  //   const dmDocRefUser2First = doc(this.dmService.directMessageCollection, dmIdUser2First);
  //   const user1FirstDoc = await getDoc(dmDocRefUser1First);
  //   const user2FirstDoc = await getDoc(dmDocRefUser2First);
  //   // if (user1FirstDoc.exists()) {
  //   //   this.setDocRef(dmIdUser1First, user1FirstDoc, dmDocRefUser1First);
  //   // } else if (user2FirstDoc.exists()) {
  //   //   this.setDocRef(dmIdUser2First, user2FirstDoc, dmDocRefUser2First);
  //   // } else {
  //   //   await this.createDocRef();
  //   // }

  //   if (user1FirstDoc.exists()) {
  //     await updateDoc(
  //       doc(this.dmService.directMessageCollection, dmIdUser1First),
  //       { content: messageInput}
  //     );
  //   } else if (user2FirstDoc.exists()) {
  //     await updateDoc(
  //       doc(this.dmService.directMessageCollection, dmIdUser2First),
  //       { content: messageInput}
  //     );
  //   }
  // }

  async checkExistingIdsAddMessage(messageInput: string, person: User) {
    const dmIdUser1First = this.dmService.getDirectMessageId(person.id, this.currentUser.id);
    const dmIdUser2First = this.dmService.getDirectMessageId(this.currentUser.id, person.id);
    const dmDocRefUser1First = doc(this.dmService.directMessageCollection, dmIdUser1First);
    const dmDocRefUser2First = doc(this.dmService.directMessageCollection, dmIdUser2First);
    const user1FirstDoc = await getDoc(dmDocRefUser1First);
    const user2FirstDoc = await getDoc(dmDocRefUser2First);

    // Neue Nachricht als Objekt mit Timestamp, Sender etc.
    const newMessage = {
      threadId: '',
      message: messageInput,
      sender: this.currentUser.id,
      timestamp: Timestamp.now(),
      reactions: [],
      // Weitere Felder je nach DM-Schnittstelle
    };




    if (user1FirstDoc.exists()) {
      // Füge Nachricht zum bestehenden content-Array hinzu (nicht ersetzen!)
      await updateDoc(dmDocRefUser1First, {
        content: arrayUnion(newMessage) // WICHTIG: `arrayUnion` aus Firestore importieren
      });
    } else if (user2FirstDoc.exists()) {
      await updateDoc(dmDocRefUser2First, {
        content: arrayUnion(newMessage)
      });
    } else {
      // Erstelle ein neues DM-Dokument, falls keine Konversation existiert
      await addDoc(this.dmService.directMessageCollection, {
        users: [this.currentUser.id, person.id],
        content: [newMessage], // Initialer Array mit erster Nachricht
        // Weitere Metadaten...
      });
    }
  }




  onInput(event: Event) {
    const input = event.target as HTMLTextAreaElement;
    const tag = this.filterService.getActiveTag(input.value);

    this.filterService.searchNewTag.set(tag ?? ''); // if null, leere es
  }


  ngAfterViewInit(): void {
    this.filterService.setTextareaRef(this.messageInputRef);
  }


  insertTag(tag: string) {
    const textarea = this.messageInputRef.nativeElement;
    const caretPos = textarea.selectionStart;
    const textBeforeCursor = this.newMessageText.substring(0, caretPos);
    const textAfterCursor = this.newMessageText.substring(caretPos);
    const match = textBeforeCursor.match(/(?:^|\s)([@#][\w-]*)$/);
    if (!match) return;
    const tagStartIndex = caretPos - match[1].length;
    const newTextBefore = textBeforeCursor.substring(0, tagStartIndex);
    const finalText = `${newTextBefore}${match[1][0]}${tag}${textAfterCursor}`;
    this.newMessageText = finalText;
    // Cursor neu setzen
    setTimeout(() => {
      textarea.focus();
      const newCaretPos = (newTextBefore + match[1][0] + tag).length;
      textarea.setSelectionRange(newCaretPos, newCaretPos);
    });

    this.filterService.searchNewTag.set('');
  }





}