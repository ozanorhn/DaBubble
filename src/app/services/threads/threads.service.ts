import { Injectable, OnDestroy } from '@angular/core';
import { collection, doc, getDoc, onSnapshot, Timestamp, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Thread } from '../../classes/thread.class';
import { UsersService } from '../users/users.service';

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
    public firestore: Firestore,
    public usersService: UsersService
  ) {
    this.threadCollection = collection(this.firestore, 'threads');
  }

// next
  async updateThread() {
    console.log('UPDATE THREAD: ', this.threadMessage);
    console.log('THREAD ID: ', this.currentThread.threadId);
    // console.log('UPDATE THREAD: ', this.);
    if (this.usersService.tempUser.id) {
      this.threadMessage.sender = this.usersService.tempUser.id;
    }
    this.threadMessage.timestamp = Timestamp.now();
    const updatedContent = [...this.currentThread.content, this.threadMessage];
    await updateDoc(
      doc(this.threadCollection, this.currentThread?.threadId),
      {
        content: updatedContent // Update entire content array
      }
    );
    console.log('Updated Threadmessage', this.threadMessage);
    this.threadMessage.message = '';
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