import { Injectable } from '@angular/core';
import { Thread } from '../../classes/thread.class';
import { addDoc, Firestore } from '@angular/fire/firestore';
import { ThreadsService } from '../threads/threads.service';
import { Message } from '../../classes/message.class';

@Injectable({
  providedIn: 'root'
})
export class ThreadMessagesService {
  currentMessageId: string = '';
  currentMessage = new Message();


  constructor(
    public firestore: Firestore,
    public threadService: ThreadsService
  ) { }


  /**
  * Creates a new thread document in Firestore for a given message ID.
  * @param {string} messageId - The ID of the message to associate with the new thread.
  * @returns {Promise<string>} The ID of the newly created thread, or an empty string on failure.
  */
  async createThreadForMessage(messageId: string): Promise<string> {
    const newThread = new Thread({ messageId });
    try {
      const docRef = await addDoc(this.threadService.threadCollection, newThread.toJSON());
      return docRef.id;
    } catch (error) {
      console.error('Error adding thread', error);
      return '';
    }
  }


  /**
   * Updates the current thread with the latest information from the current message.
   * @returns {Promise<{ answers: number, lastAnswer: any }>} An object containing the updated number of answers and the last reply's timestamp.
   */
  async updateThread() {
    this.threadService.currentThread().threadId = this.currentMessage.threadId;
    await this.threadService.updateThread();
    return {
      answers: this.threadService.currentThread().content.length,
      lastAnswer: this.threadService.currentThread().content[this.threadService.currentThread().content.length - 1].timestamp,
    };
  }
}