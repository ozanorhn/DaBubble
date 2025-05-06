import { Injectable } from '@angular/core';
import { Thread } from '../../classes/thread.class';
import { addDoc, collection, doc, Firestore, getDoc, Timestamp, updateDoc } from '@angular/fire/firestore';
import { ThreadsService } from '../threads/threads.service';
import { Message } from '../../classes/message.class';
import { MessagesService } from '../messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadMessagesService {

  currentMessageId: string = '';
  currentMessage = new Message();

  constructor(
    public firestore: Firestore,
    public threadService: ThreadsService,
    // public massegesServive: MessagesService
  ) {
    // this.threadService.threadCollection = collection(this.firestore, 'threads');
  }


  // async createThreadForMessage() {
  //   console.log('Message ID', this.currentMessage.id)
  //   this.threadService.currentThread().messageId = this.currentMessageId;
  //   console.log('current thread is', this.threadService.currentThread().messageId);
  //   // const thread = new Thread({ messageId: this.currentMessage.id })
  //   try {
  //     const docRef = await addDoc(this.threadService.threadCollection, this.threadService.currentThread().toJSON());
  //     console.log('Thread added with ID', docRef.id);
  //     return docRef.id
  //     // Message.THredID = docRef.id
  //   } catch (error) {
  //     console.error('Error adding thread', error);
  //     return ''
  //   }
  // }

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
    // console.log('Current Thread', this.threadService.currentThread);
    // console.log('Thread Collection', this.threadService.threadCollection);
    // console.log('ThreadMessage', this.threadService.threadMessage);
    // this.threadService.threadMessage.timestamp = Timestamp.now();
    // await updateDoc(
    //   doc(this.threadService.threadCollection, this.threadService.currentThread?.threadId),
    //   {
    //     content: this.threadService.threadMessage // Update entire content array
    //   }
    // );
    // console.log('Updated Threadmessage', this.threadService.threadMessage);
    console.log(this.currentMessage);
    this.threadService.currentThread().threadId = this.currentMessage.threadId;
    
    await this.threadService.updateThread();
  }
}
