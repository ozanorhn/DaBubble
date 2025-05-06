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


  async createThreadForMessage(messageId: string): Promise<string> {
    const newThread = new Thread({ messageId });
  
    try {
      const docRef = await addDoc(this.threadService.threadCollection, newThread.toJSON());
      console.log('Thread added with ID', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding thread', error);
      return '';
    }
  }


  async updateThread() {
    console.log(this.currentMessage);
    this.threadService.currentThread().threadId = this.currentMessage.threadId;
    
    await this.threadService.updateThread();

    return {
      answers: this.threadService.currentThread().content.length,
      lastAnswer: this.threadService.currentThread().content[this.threadService.currentThread().content.length - 1].timestamp,
    };
  }
}
