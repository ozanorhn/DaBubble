import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDoc, onSnapshot, Timestamp, Unsubscribe, updateDoc } from '@angular/fire/firestore';
import { Thread } from '../../classes/thread.class';
import { DM } from '../../interfaces/dm';
import { ThreadsService } from '../threads/threads.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadDMsService {
  unsubscribeSnapshot: Unsubscribe | null = null;


  constructor(
    public firestore: Firestore,
    public threadService: ThreadsService
  ) {
    this.threadService.threadCollection = collection(this.firestore, 'threads');
  }


  /**
   * Creates a new thread in Firestore for a direct message (DM).
   * @param {DM} message - The DM message used to initialize the thread.
   * @returns {Promise<string | null>} The ID of the newly created thread, or null if creation fails.
   */
  async createThreadForDM(message: DM): Promise<string | null> {
    try {
      const threadData = new Thread({ createdAt: Timestamp.now(), participants: [message.sender] });
      const threadsCollection = collection(this.firestore, 'threads');
      const docRef = await addDoc(threadsCollection, threadData.toJSON());
      const threadId = docRef.id;
      threadData.threadId = threadId;
      this.threadService.currentThread.set(threadData);
      return threadId;
    } catch (error) {
      console.error('Fehler beim Erstellen eines DM-Threads:', error);
      return null;
    }
  }

  /**
   * Updates the current thread with new content.
   * @returns {Promise<{ answers: number, lastAnswer: any }>} An object containing the number of replies and the timestamp of the last reply.
   */
  async updateThread() {
    await this.threadService.updateThread();
    return {
      answers: this.threadService.currentThread().content.length,
      lastAnswer: this.threadService.currentThread().content[this.threadService.currentThread().content.length - 1].timestamp,
    }
  }
}