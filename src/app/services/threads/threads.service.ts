import { inject, Injectable } from '@angular/core';
import { addDoc, collection, doc, getDoc, Timestamp } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Thread } from '../../classes/thread.class';
import { update } from '@angular/fire/database';
import { MessagesService } from '../messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
  threadCollection;
  currentThread: Thread | undefined;
  currentMessageId: string = '';

  newThread = '';

  constructor(
    public firestore: Firestore,
  ) {
    this.threadCollection = collection(this.firestore, 'threads');
  }

  async loadThreadById(threadId: string): Promise<any> {
    const threadDocRef = doc(this.threadCollection, threadId);
    const threadSnap = await getDoc(threadDocRef);
    console.log('WWWWWWWWWWWWWW      ', threadSnap.data() ? threadSnap.data() as Thread : undefined);
    
    this.currentThread = threadSnap.data() ? threadSnap.data() as Thread : undefined;
  }

  getThread() {
    return {
      threadId: 'Test Thread',
      content: [
        {
          message: 'Hallo ich bin die erste Thread Nachricht',
          sender: 'User Id ',
          reactions: [],
          timestamp: Timestamp.now()
        },
        {
          message: 'Hallo ich bin die zweite Thread Nachricht',
          sender: 'User Id ',
          reactions: [],
          timestamp: Timestamp.now()
        },
        {
          message: 'Hallo ich bin die dritte Thread Nachricht',
          sender: 'User Id ',
          reactions: [],
          timestamp: Timestamp.now()
        }
      ]
    }
  }

  async sendThread() {
    const thread = this.getThread()
    console.log('current thread is', thread);
    try {
      const docRef = await addDoc(this.threadCollection, thread);
      console.log('Thread added with ID', docRef.id);
    } catch (error) {
      console.error('Error adding thread', error);
    }
  }
}