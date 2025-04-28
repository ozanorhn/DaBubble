import { Injectable, signal } from '@angular/core';
import { ChannelsService } from '../channels/channels.service';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';

import { Message } from '../../classes/message.class';
import { Channel } from '../../classes/channel.class';
import { UsersService } from '../users/users.service';
import { User } from '../../classes/user.class';



@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messageCollection;
  Message: [] = [];

  messages = signal<Message[]>([]);

  members: [] = [];

  constructor(
    public channelService: ChannelsService,
    public firestore: Firestore,
    public userService: UsersService
  ) {
    this.messageCollection = collection(this.firestore, 'messages');
    this.channelService.currentIndex();

    // this.getUserById('5Ld4OSJtEIoZ9hCNDIJ1')
  }


  getMessage() {
    return {
      name: 'Hallo Test 2',
      sender: '5Ld4OSJtEIoZ9hCNDIJ1',
      timestamp: new Date(),
      reactions: [],
      threadId: 'WIDsWo1ivqW8d8csYtiS',
      channelId: this.channelService.channels[this.channelService.currentIndex()].id
    }
  }


  //// Test Get Members
  // async getMember() {
  //   const q = query(this.userService.usersCollection, where('channelId', '==', obj.id));
  //   const querySnapshot = await getDocs(q);
  //   const messages = querySnapshot.docs.map(doc => ({
  //     id: doc.id,
  //     ...doc.data()
  //   }) as Message);

  //   this.messages.set(messages)
  //   console.log('Message Array', this.messages());
  //   return messages;
  // }


  // getUserById(id: string) {
  //   let thisUser: undefined | User = undefined;
  //   this.userService.users.forEach(user => {
  //     if (user.id === id) {
  //       console.log('Return User', user);
  //       thisUser = user;
  //     }
  //   });
  //   return thisUser;
  // }

  // getUserNameById(id: string) {
  //   let user: User | undefined = this.getUserById(id);
  //   if (user instanceof User) {
  //     return user.name
  //   }
  // }

  getMembers() {
    // for (let i = 0; i < members.length; i++) {
    //   this.getUserById()

    // }
  }


  async getMessages(obj: Channel) {

    const q = query(this.messageCollection, where('channelId', '==', obj.id));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }) as Message);

    this.messages.set(messages)
    console.log('Message Array', this.messages());
    return messages;
  }


  async sendMessage() {
    const message = this.getMessage()
    try {
      const docRef = await addDoc(this.messageCollection, message)
    } catch (error) {
      console.error('Error adding message', error);
    }
  }


}
