import { Injectable, OnDestroy, signal } from '@angular/core';
import { ChannelsService } from '../channels/channels.service';
import { addDoc, collection, doc, Firestore, getDocs, onSnapshot, query, Timestamp, Unsubscribe, updateDoc, where } from '@angular/fire/firestore';
import { Message } from '../../classes/message.class';
import { Channel } from '../../classes/channel.class';
import { UsersService } from '../users/users.service';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { ThreadsService } from '../threads/threads.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ThreadDMsService } from '../threadDMs/thread-dms.service';
import { ThreadMessagesService } from '../threadMessages/thread-messages.service';
registerLocaleData(localeDe);
@Injectable({
  providedIn: 'root'
})


/**
 * Service for message operations (Firestore integration)
 * @class MessagesService
 * @Injectable providedIn: 'root'
 */
export class MessagesService implements OnDestroy {

  message: Message = new Message({
    id: '',
    message: '',
    sender: '',
    timestamp: Timestamp.now(),
    reactions: [],
    threadId: '',
    channelId: '',
    answers: 0,
    lastAnswer: null
  });

  messageCollection;
  Message: [] = [];
  messages = signal<Message[]>([]);
  members: [] = [];
  lastDate: Date = new Date();
  date = new Date();
  unsubscribeFromMessages?: () => void;


  constructor(
    public channelService: ChannelsService,
    public firestore: Firestore,
    public userService: UsersService,
    public threadService: ThreadsService,
    public threadDMsService: ThreadDMsService,
    public threadMessagesService: ThreadMessagesService
  ) {
    this.messageCollection = collection(this.firestore, 'messages');
    this.channelService.currentIndex();
    this.date.setDate(this.date.getDate() - 1);
  }


  // /**
  //  * Fetches messages for a channel
  //  * @param {Channel} obj - Channel object
  //  * @returns {Promise<Message[]>} Sorted messages
  //  */
  // async getMessages(obj: Channel) {
  //   const q = query(this.messageCollection, where('channelId', '==', obj.id));
  //   const querySnapshot = await getDocs(q);
  //   const messages = querySnapshot.docs.map(doc => ({
  //     id: doc.id,
  //     ...doc.data()
  //   }) as Message);
  //   this.messages.set(this.sortMessages(messages))
  //   console.log('Message Array', this.messages());
  //   return this.sortMessages(messages);
  // }


  /**
  * Sorts messages by timestamp (ascending)
  * @param {Message[]} messages - Messages to sort
  * @returns {Message[]} Sorted messages
  */
  sortMessages(messages: Message[]): Message[] {
    return messages.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);
  }


  // getMessages(obj: Channel) {
  //   if (this.unsubscribeFromMessages) {
  //     this.unsubscribeFromMessages();
  //   }

  //   const q = query(this.messageCollection, where('channelId', '==', obj.id));

  //   this.unsubscribeFromMessages = onSnapshot(q, (querySnapshot) => {
  //     const messages = querySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }) as Message);
  //      console.log('snapShot messages',messages);

  //     const sorted = this.sortMessages(messages);
  //     this.messages.set(sorted);
  //     console.log('Live-updated messages:', sorted);
  //   }, (error) => {
  //     console.error('Error listening to messages:', error);
  //   });
  // }


  getMessages(obj: Channel) {
    if (this.unsubscribeFromMessages) {
      this.unsubscribeFromMessages();
    }

    const q = query(this.messageCollection, where('channelId', '==', obj.id));

    this.unsubscribeFromMessages = onSnapshot(q, (querySnapshot) => {
      console.log('QuerySnapshot:', querySnapshot.docs); // Rohdaten
      const messages = querySnapshot.docs.map(doc => {
        // const data = { id: doc.id, ...doc.data() };
        const data = doc.data();
        data['id'] = doc.id;
        console.log('DocId', doc.id);

        console.log('Mapped message:', data); // Einzelnes Dokument
        return data as Message;
      });
      console.log('snapShot messages', messages);
      const sorted = this.sortMessages(messages);
      this.messages.set(sorted);
      console.log('Live-updated messages:', sorted);
    }, (error) => {
      console.error('Error listening to messages:', error);
    });
  }




  /**
   * Sends a new message
   * @async
   */
  async sendMessage() {
    this.message.timestamp = Timestamp.now(),
      this.message.channelId = this.channelService.channels[this.channelService.currentIndex()].id;
    console.log('To JSON OBjsect Test', this.message);
    try {
      const docRef = await addDoc(this.messageCollection, this.message.toJSON())
    } catch (error) {
      console.error('Error adding message', error);
    }
  }


  //// Geht noch nicht  
  async editMessage(id: string) {
    await updateDoc(
      doc(this.messageCollection, id),
      this.message.toJSON()
    );
  }


  // /**
  // * Opens a thread
  // * @param {string} messageId - Message ID
  // * @param {string} threadId - Thread ID
  // */
  // openThread(messageId: string, threadId: string) {
  //   this.threadService.currentMessageId = messageId;
  //   this.threadService.loadThreadById(threadId);
  // }



  async onMessageClick(message: Message) {
    console.log('Message:  ', message);

    this.threadService.currentMessage = message;
    if (!message.threadId) {
      // Erstelle neuen Thread falls nicht existiert
      await this.threadMessagesService.createThreadForMessage(message.id);
      console.log('onMessageClick Message id to Thread createThreadForMessage', message.id);
    } else {
      console.log('öffne bestehenden thread');
      
    }

  } 


  /**
   * Formats timestamp as time (HH:mm)
   * @param {Timestamp} timestamp - Firebase timestamp
   * @returns {string} Formatted time string
   */
  formatTime(timestamp: Timestamp): string {
    return formatDate(timestamp.toDate(), 'HH:mm', 'de-DE')
  }


  /**
   * Formats date (Today/Yesterday/Date)
   * @param {Timestamp} timestamp - Firebase timestamp
   * @returns {string} Formatted date string
   */
  formatDate(timestamp: Timestamp): string {
    if (!timestamp?.toDate) return '';
    const date = timestamp.toDate();
    this.lastDate = date;
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (this.isSameDay(date, today)) {
      return 'Heute';
    } else if (this.isSameDay(date, yesterday)) {
      return 'Gestern';
    } else {
      return formatDate(date, 'EEEE, dd.MM.yyyy', 'de-DE');
    }
  }



  /**
   * Checks if two dates are the same day
   * @param {Date} d1 - Date 1
   * @param {Date} d2 - Date 2
   * @returns {boolean} True if same day
   */
  isSameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }


  /**
   * Converts a Firestore Timestamp to a JavaScript Date object.
   *
   * @param {Timestamp} timestamp - The Firestore Timestamp to convert.
   * @returns {Date} The equivalent JavaScript Date object.
   */
  getDateFromTimestamp(timestamp: Timestamp): Date {
    return timestamp.toDate();
  }


  ngOnDestroy(): void {
    if (this.unsubscribeFromMessages) {
      this.unsubscribeFromMessages();
    }
  }
}
