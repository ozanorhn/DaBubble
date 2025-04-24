import { inject, Injectable, signal } from '@angular/core';
import { ChannelsService } from '../channels/channels.service';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { Message } from '../../classes/message.class';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messageCollection;
  // messages: Message[] = [];
  messages = signal<Message[]>([]);


  constructor(public channelService: ChannelsService, public firestore: Firestore) {
    this.messageCollection = collection(this.firestore, 'messages');
    this.channelService.currentId();
  }


  getMessage() {
    return {
      name: 'Hallo Test 2',
      sender: 'UserIdd4t45t34tf',
      timestamp: new Date(),
      createdBy: '84592305',
      reactions: [],
      threadId: '',
      channelId: this.channelService.currentId()
    }
  }


  async getMessages(channelId: string | undefined) {
    debugger
    const q = query(this.messageCollection, where('channelId', '==', channelId));

    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }) as Message);


    // this.messages = messages;
    this.messages.set(messages)

    console.log('Message Array', this.messages());
    return messages;
  }




  async sendMessage() {
    const message = this.getMessage()
    console.log('current channel is', message);
    try {
      const docRef = await addDoc(this.messageCollection, message)
      console.log('Message added with ID', docRef.id);
    } catch (error) {
      console.error('Error adding message', error);
    }
  }


}
