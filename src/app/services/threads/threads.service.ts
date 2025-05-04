import { inject, Injectable } from '@angular/core';
import { addDoc, arrayUnion, collection, doc, getDoc, onSnapshot, Timestamp, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Thread } from '../../classes/thread.class';
import { update } from '@angular/fire/database';
import { MessagesService } from '../messages/messages.service';
import { Message } from '../../classes/message.class';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
  threadCollection;
  currentThread: Thread | undefined = new Thread();
  currentMessageId: string = '';
  currentMessage = new Message();
  
  threadMessage = {
    message: '',
    sender: '',
    reactions: [],
    timestamp: Timestamp.now()
  }


  constructor(
    public firestore: Firestore,
  ) {
    this.threadCollection = collection(this.firestore, 'threads');
  }

  async loadThreadById(threadId: string): Promise<any> {
    if (threadId === '') {
      // erstelle neuen thread in der Firebase
      this.createThreadForMessage(this.currentMessageId);
    } else {
      const threadDocRef = doc(this.threadCollection, threadId);
      const threadSnap = await getDoc(threadDocRef);
      console.log('WWWWWWWWWWWWWW      ', threadSnap.data() ? threadSnap.data() as Thread : undefined);
      this.currentThread = threadSnap.data() ? threadSnap.data() as Thread : undefined;
    }
  }



  async createThreadForMessage(MessageId: string) {
    console.log('Message ID',MessageId );
    console.log('Message ID', this.currentMessage.id)
    

    const thread = new Thread({ messageId: MessageId })

    console.log('current thread is', thread);
    try {
      const docRef = await addDoc(this.threadCollection, thread.toJSON());
      console.log('Thread added with ID', docRef.id);
           // Message.THredID = docRef.id
    } catch (error) {
      console.error('Error adding thread', error);
    }


  }


  async getThread(threadId: string): Promise<Thread | undefined> {
    const docRef = doc(this.threadCollection, threadId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? new Thread(snapshot.data() as any) : undefined;
  }



  // watchThread(threadId: string): void {
  //   this.unsubscribeThread(); // Vorherigen Listener entfernen
    
  //   const threadRef = doc(this.threadCollection, threadId);
    
  //   this.threadUnsubscribe = onSnapshot(threadRef, (snapshot) => {
  //     if (snapshot.exists()) {
  //       const threadData = snapshot.data();
  //       const thread = new Thread({
  //         ...threadData,
  //         threadId: snapshot.id
  //       });
  //       this.currentThread$.next(thread);
  //     } else {
  //       this.currentThread$.next(null);
  //     }
  //   }, (error) => {
  //     console.error('Thread watch error:', error);
  //   });
  // }

  // async addThreadMessage(threadId: string, message: ThreadMessage): Promise<void> {
  //   const threadRef = doc(this.threadCollection, threadId);
  //   await updateDoc(threadRef, {
  //     content: arrayUnion(message)
  //   });
  // }


}