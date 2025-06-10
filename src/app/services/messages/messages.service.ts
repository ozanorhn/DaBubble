import { Injectable, OnDestroy, signal } from '@angular/core';
import { ChannelsService } from '../channels/channels.service';
import { addDoc, collection, doc, Firestore, onSnapshot, query, Timestamp, updateDoc, where } from '@angular/fire/firestore';
import { Message } from '../../classes/message.class';
import { Channel } from '../../classes/channel.class';
import { UsersService } from '../users/users.service';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { ThreadsService } from '../threads/threads.service';
import { ThreadDMsService } from '../threadDMs/thread-dms.service';
import { ThreadMessagesService } from '../threadMessages/thread-messages.service';
import { DM } from '../../interfaces/dm';
import { Thread } from '../../classes/thread.class';
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
  messageInput = '';
  messageCollection;
  Message: [] = [];
  messages = signal<Message[]>([]);
  members: [] = [];
  lastDate: Date = new Date();
  date = new Date();
  edit: boolean = false;
  unsubscribeFromMessages?: () => void;

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


  constructor(
    public channelService: ChannelsService,
    public firestore: Firestore,
    public userService: UsersService,
    public threadService: ThreadsService,
    public threadDMsService: ThreadDMsService,
    public threadMessagesService: ThreadMessagesService
  ) {
    this.messageCollection = collection(this.firestore, 'messages');
    this.channelService.selectedChannelIndex();
    this.date.setDate(this.date.getDate() - 1);
  }


  /**
  * Sorts messages by timestamp (ascending)
  * @param {Message[]} messages - Messages to sort
  * @returns {Message[]} Sorted messages
  */
  sortMessages(messages: Message[] | DM[]): Message[] | DM[] {
    return messages.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);
  }
  

  /**
   * Subscribes to messages for a specific channel and updates the local message array.
   * @param {Channel} obj - The channel object to load messages for.
   */
  getMessages(obj: Channel) {
    if (this.unsubscribeFromMessages) this.unsubscribeFromMessages();
    const q = query(this.messageCollection, where('channelId', '==', obj.id));
    this.unsubscribeFromMessages = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => {
        const data = doc.data();
        data['id'] = doc.id;
        return new Message(data);
      });
      const sorted = this.sortMessages(messages);
      this.messages.set(sorted as Message[]);
    }, (error) => { console.error('Error listening to messages:', error); });
  }


  /**
   * Sends a new message
   * @async
   */
  async sendMessage() {
    this.message = new Message();
    if (this.userService.currentUser.id) this.message.sender = this.userService.currentUser.id;
    this.message.timestamp = Timestamp.now();
    this.message.message = this.messageInput;
    this.message.channelId = this.channelService.channels[this.channelService.selectedChannelIndex()].id;
    try {
      const docRef = await addDoc(this.messageCollection, this.message.toJSON())
      this.messageInput = '';
    } catch (error) {
      console.error('Error adding message', error);
    }
  }


  /**
   * Edits an existing message in Firestore.
   * @param {Message} [message=this.message] - The message to update.
   * @returns {Promise<void>} A promise that resolves when the update is complete.
   */
  async editMessage(message: Message = this.message): Promise<void> {
    await updateDoc(
      doc(this.messageCollection, message.id),
      message.toJSON()
    );
  }


  /**
  * Resets temporary values for the current message and thread message.
  */
  resetTempValues() {
    this.threadService.threadMessage = {
      message: '',
      sender: '',
      reactions: [],
      timestamp: Timestamp.now()
    };
    this.message = new Message({
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
  }


  /**
  * Opens a thread for a given message or creates a new one if it doesn't exist.
  * @param {Message} message - The message for which to open or create a thread.
  * @returns {Promise<void>}
  */
  async openChannelThread(message: Message): Promise<void> {
    this.resetTempValues();
    const selectedMessage = new Message({ ...message });
    this.message = message;
    this.threadMessagesService.currentMessage = selectedMessage;
    this.threadMessagesService.currentMessageId = selectedMessage.id;
    this.threadService.currentThread.set(new Thread());
    if (!selectedMessage.threadId) {
      this.createThread(message, selectedMessage);
    } else {
      await this.threadService.loadThreadById(selectedMessage.threadId);
    }
  }

  /**
   * Creates a new thread for a message and updates the message with the thread ID.
   * @param {Message} message - The original message.
   * @param {Message} selectedMessage - The message used to create the thread.
   * @returns {Promise<void>}
   */
  async createThread(message: Message, selectedMessage: Message): Promise<void> {
    const threadId = await this.threadMessagesService.createThreadForMessage(selectedMessage.id);
    if (threadId) {
      selectedMessage.threadId = threadId;
      message.threadId = threadId;
      await this.editMessage(message);
      await this.threadService.loadThreadById(threadId);
    } else {
      console.warn('Thread konnte nicht erstellt werden.');
      return;
    }
  }


  /**
     * Updates thread data like answer count and timestamp of the last reply.
     * @returns {Promise<void>}
     */
  async updateThread(): Promise<void> {
    const threadData = await this.threadMessagesService.updateThread();
    this.message.answers = threadData.answers;
    this.message.lastAnswer = threadData.lastAnswer;
    this.editMessage(this.message);
  }


  /**
   * Formats timestamp as time (HH:mm)
   * @param {Timestamp} timestamp - Firebase timestamp
   * @returns {string} Formatted time string
   */
  formatTime(timestamp: Timestamp): string {
    return formatDate(timestamp.toDate(), "HH:mm 'Uhr'", 'de-DE')
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
    if (this.isSameDay(date, today)) return 'Heute';
    else if (this.isSameDay(date, yesterday)) return 'Gestern';
    else return formatDate(date, 'EEEE, dd.MM.yyyy', 'de-DE');
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


  /**
   * Lifecycle hook that performs cleanup when the service is destroyed.
   */
  ngOnDestroy(): void {
    if (this.unsubscribeFromMessages) {
      this.unsubscribeFromMessages();
    }
  }
}