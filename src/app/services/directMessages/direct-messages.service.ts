import { Injectable } from '@angular/core';
import { addDoc, collection } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DirectMessagesService {

  directMessageCollection;

  constructor(public firestore: Firestore) {
    this.directMessageCollection = collection(this.firestore, 'directMessages');
  }


  getDirectMessage() {
    return {
      id: 'Test DirectMessage',
      participants: {
        user1: 'IDur8384394z3',
        user2: 'ID84fkdjhuu'
      },
      content: [
        {
          message: 'Hallo ich bin die erste Thread Nachricht',
          sender: 'IDur8384394z3 ',
          timestamp: '',
          reactions: []
        },
        {
          message: 'Hallo ich bin eine die zweite Thread Nachricht',
          sender: 'ID84fkdjhuu',
          timestamp: '',
          reactions: []
        },
        {
          message: 'Hallo ich bin eine die dritte Thread Nachricht',
          sender: 'ID84fkdjhuu',
          timestamp: '',
          reactions: []
        }
      ]
    }
  }



  async sendDirectMessage() {
    const directMessage = this.getDirectMessage()
    console.log('current directMessage is', directMessage);
    try {
      const docRef = await addDoc(this.directMessageCollection, directMessage)
      console.log('DirectMessage added with ID', docRef.id);
    } catch (error) {
      console.error('Error adding directMessage', error);
    }
  }


}
