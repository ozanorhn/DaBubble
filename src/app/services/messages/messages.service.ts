import { Injectable, signal } from '@angular/core';
import { ChannelsService } from '../channels/channels.service';
import { addDoc, collection, Firestore, getDocs, query, Timestamp, where } from '@angular/fire/firestore';

import { Message } from '../../classes/message.class';
import { Channel } from '../../classes/channel.class';
import { UsersService } from '../users/users.service';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);
@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messageCollection;
  Message: [] = [];
  messages = signal<Message[]>([]);
  members: [] = [];
  lastDate: Date = new Date();
  date = new Date()

  constructor(
    public channelService: ChannelsService,
    public firestore: Firestore,
    public userService: UsersService
  ) {
    this.messageCollection = collection(this.firestore, 'messages');
    this.channelService.currentIndex();
    this.date.setDate(this.date.getDate() - 1);
  }


  getMessage(): Message {
    return new Message({
      name: 'Hallo Test 2',
      sender: '6xN38YGFasqdAqssgnO9',
      timestamp: Timestamp.now(),
      reactions: [],
      threadId: 'WIDsWo1ivqW8d8csYtiS',
      channelId: this.channelService.channels[this.channelService.currentIndex()].id,
      message: 'Ich bin eine TestMessage'
    })
  }


  // async getMessages(obj: Channel) {
  //   const q = query(this.messageCollection, where('channelId', '==', obj.id));
  //   const querySnapshot = await getDocs(q);
  //   const messages = querySnapshot.docs.map(doc => ({
  //     id: doc.id,
  //     ...doc.data()
  //   }) as Message);
  //   this.messages.set(messages)
  //   console.log('Message Array', this.messages());
  //   return messages;
  // }


  async getMessages(obj: Channel) {
    const q = query(this.messageCollection, where('channelId', '==', obj.id));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }) as Message);
    this.messages.set(this.sortMessages(messages))
    console.log('Message Array', this.messages());
    return this.sortMessages(messages);
  }


  sortMessages(messages: Message[]): Message[] {
    return messages.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);
  }


  async sendMessage() {
    const message = this.getMessage().toJSON()
    console.log('To JSON OBjsect Test', message);
    try {
      const docRef = await addDoc(this.messageCollection, message)
    } catch (error) {
      console.error('Error adding message', error);
    }
  }


  formatTime(timestamp: Timestamp) {
    return formatDate(timestamp.toDate(), 'HH:mm', 'de-DE')
  }


  formatDate(timestamp: Timestamp): string {
    if (!timestamp?.toDate) return ''; // Fallback, falls timestamp ungültig ist
    const date = timestamp.toDate(); // Firebase-Timestamp in JavaScript-Datum umwandeln
    this.lastDate = date;
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (this.isSameDay(date, today)) {
      return 'Heute';
    } else if (this.isSameDay(date, yesterday)) {
      return 'Gestern';
    } else {
      return formatDate(date, 'EEEE dd.MM.yyyy', 'de-DE');
    }
  }


  isSameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }


  getDateFromTimestamp(timestamp: Timestamp): Date {
    return timestamp.toDate();
  }


}
