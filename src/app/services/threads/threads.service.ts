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


  /**
  * Updates the currently active thread by appending a new message to its content array.
  * @returns {Promise<void>}
  */
  async updateThread(edit: boolean = false): Promise<void> {
    let updatedContent = this.getUpdateContent(edit);
    await updateDoc(
      doc(this.threadCollection, this.currentThread()?.threadId),
      {
        content: updatedContent
      }
    );
    this.threadMessage.message = '';
  }


  getUpdateContent(edit: boolean) {
    if (edit) {
      return this.currentThread().content;
    } else {
      this.threadMessage.sender = this.usersService.currentUser.id;
      this.threadMessage.timestamp = Timestamp.now();
      return [...this.currentThread().content, this.threadMessage];
    }
  }


  /**
  * Loads a thread from Firestore by its ID and subscribes to real-time updates.
  * @param {string} threadId - The ID of the thread to load.
  * @returns {Promise<void>}
  */
  async loadThreadById(threadId: string): Promise<any> {
    const threadRef = doc(this.firestore, 'threads', threadId);
    this.unsubscribeFromThreads = onSnapshot(threadRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        data['threadId'] = docSnapshot.id;
        const thread = new Thread(data);
        this.currentThread.set(thread);
      } else console.warn('Thread not found');
    }, (error) => {
      console.error('Error listening to thread:', error);
    });
  }


  /**
   * Lifecycle hook for cleaning up the Firestore thread subscription on service destruction.
   */
  ngOnDestroy(): void {
    if (this.unsubscribeFromThreads) {
      this.unsubscribeFromThreads();
    }
  }
}