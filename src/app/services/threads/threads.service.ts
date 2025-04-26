import { Injectable } from '@angular/core';
import { addDoc, collection } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {


  threadCollection;

  constructor(public firestore: Firestore) {
    this.threadCollection = collection(this.firestore, 'threads');
  }


  getThread() {
    return {
      threadId: 'Test Thread',
      content: [
        {
          message: 'Hallo ich bin die erste Thread Nachricht',
          sender: 'User Id ',
          reactions: [],
          timestamp: new Date()
        },
        {
          message: 'Hallo ich bin eine die zweite Thread Nachricht',
          sender: 'User Id ',
          reactions: [],
          timestamp: new Date()
        },
        {
          message: 'Hallo ich bin eine die dritte Thread Nachricht',
          sender: 'User Id ',
          reactions: [],
          timestamp: new Date()
        }
      ]
    }
  }



  async sendThread() {
    const thread = this.getThread()
    console.log('current thread is', thread);
    try {
      const docRef = await addDoc(this.threadCollection, thread)
      console.log('Thread added with ID', docRef.id);
    } catch (error) {
      console.error('Error adding thread', error);
    }
  }




}
