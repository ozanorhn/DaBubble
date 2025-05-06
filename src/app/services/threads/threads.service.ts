import { Injectable, OnDestroy } from '@angular/core';
import { collection, doc, getDoc, onSnapshot, Timestamp, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Thread } from '../../classes/thread.class';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService implements OnDestroy {
  threadCollection;
  currentThread: Thread = new Thread();
  unsubscribeFromThreads?: () => void;
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
    this.threadMessage.timestamp = Timestamp.now();
    await updateDoc(
      doc(this.threadCollection, this.currentThread?.threadId),
      {
        content: this.threadMessage // Update entire content array
      }
    );
    console.log('Updated Threadmessage', this.threadMessage);
  }


  async loadThreadById(threadId: string): Promise<any> {
    const threadRef = doc(this.firestore, 'threads', threadId);
    this.unsubscribeFromThreads = onSnapshot(threadRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        data['id'] = docSnapshot.id;
        const thread = new Thread (data);
        this.currentThread = thread
      } else {
        console.warn('Thread not found');
      }
    }, (error) => {
      console.error('Error listening to thread:', error);
    });
  }

  
  ngOnDestroy(): void {
    if (this.unsubscribeFromThreads) {
      this.unsubscribeFromThreads();
    }
  }
}