import { Injectable, OnDestroy, signal } from '@angular/core';
import { collection, doc, getDoc, onSnapshot, Timestamp, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Thread } from '../../classes/thread.class';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService implements OnDestroy {
  threadCollection;
  currentThread = signal<Thread>(new Thread());
  chatType: 'channel' | 'dm' | '' = '';

  unsubscribeFromThreads?: () => void;

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


  async updateThread() {
    this.threadMessage.sender = this.usersService.currentUser.id;
    this.threadMessage.timestamp = Timestamp.now();
    const updatedContent = [...this.currentThread().content, this.threadMessage];
    await updateDoc(
      doc(this.threadCollection, this.currentThread()?.threadId),
      {
        content: updatedContent
      }
    );
    this.threadMessage.message = '';
  }


  async loadThreadById(threadId: string): Promise<any> {
    const threadRef = doc(this.firestore, 'threads', threadId);
    this.unsubscribeFromThreads = onSnapshot(threadRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        data['threadId'] = docSnapshot.id;
        const thread = new Thread (data);
        this.currentThread.set(thread);
      } else console.warn('Thread not found');
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