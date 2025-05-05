import { Injectable } from '@angular/core';
import { collection, doc, getDoc, Timestamp, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Thread } from '../../classes/thread.class';
import { Message } from '../../classes/message.class';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
  threadCollection;
  currentThread: Thread | undefined = new Thread();
  currentMessageId: string = '';
  currentMessage = new Message();
  // unsubscribeSnapshot
  newThreadId = '';

  chatType: 'channel' | 'dm' | '' = '';

  threadMessage = {
    message: '',
    sender: '',
    reactions: [],
    timestamp: Timestamp.now()
  }

  constructor(
    public firestore: Firestore
  ) {
    this.threadCollection = collection(this.firestore, 'threads');
  }



  async updateThread() {
    console.log('Current Thread', this.currentThread);
    console.log('Thread Collection', this.threadCollection);
    console.log('ThreadMessage', this.threadMessage);
    console.log('New THread ID', this.newThreadId);
    

    this.threadMessage.timestamp = Timestamp.now();
    await updateDoc(
      doc(this.threadCollection, this.newThreadId),
      {
        content: this.threadMessage // Update entire content array
      }
    );
    console.log('Updated Threadmessage', this.threadMessage);
  }


  
  async getThread(threadId: string): Promise<Thread | undefined> {
    const docRef = doc(this.threadCollection, threadId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? new Thread(snapshot.data() as any) : undefined;
  }




  
}