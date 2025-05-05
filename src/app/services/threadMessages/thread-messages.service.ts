import { Injectable } from '@angular/core';
import { Thread } from '../../classes/thread.class';
import { addDoc, collection, doc, Firestore, getDoc, Timestamp, updateDoc } from '@angular/fire/firestore';
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
    public threadServive: ThreadsService
  ) {
    this.threadServive.threadCollection = collection(this.firestore, 'threads');
  }


  async createThreadForMessage() {
    console.log('Message ID', this.currentMessage.id)
    this.threadServive.currentThread.messageId = this.currentMessage.id;
    console.log('current thread is', this.threadServive.currentThread.messageId);
    const thread = new Thread({ messageId: this.currentMessage.id })
    try {
      const docRef = await addDoc(this.threadServive.threadCollection, this.threadServive.currentThread.toJSON());
      console.log('Thread added with ID', docRef.id);
      return docRef.id
      // Message.THredID = docRef.id
    } catch (error) {
      console.error('Error adding thread', error);
      return ''
    }
  }


  async updateThread() {
    // console.log('Current Thread', this.threadServive.currentThread);
    // console.log('Thread Collection', this.threadServive.threadCollection);
    // console.log('ThreadMessage', this.threadServive.threadMessage);
    this.threadServive.threadMessage.timestamp = Timestamp.now();
    await updateDoc(
      doc(this.threadServive.threadCollection, this.threadServive.currentThread?.threadId),
      {
        content: this.threadServive.threadMessage // Update entire content array
      }
    );
    console.log('Updated Threadmessage', this.threadServive.threadMessage);

  }
}
