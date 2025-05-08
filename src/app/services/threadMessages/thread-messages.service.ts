import { Injectable } from '@angular/core';
import { Thread } from '../../classes/thread.class';
import { addDoc, collection, doc, Firestore, getDoc, Timestamp, updateDoc } from '@angular/fire/firestore';
import { ThreadsService } from '../threads/threads.service';
import { User } from '../../classes/user.class';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadMessagesService {


  currentUser

  constructor(
    public firestore: Firestore,
    public threadServive: ThreadsService,
    public localStorageS: LocalStorageService
  ) {
    this.threadServive.threadCollection = collection(this.firestore, 'threads');
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;


  }




  async createThreadForMessage(MessageId: string) {
    console.log('Message ID', MessageId);
    console.log('Message ID', this.threadServive.currentMessage.id)

    const thread = new Thread({ messageId: MessageId })
    console.log('current thread is', thread);
    try {
      const docRef = await addDoc(this.threadServive.threadCollection, thread.toJSON());
      console.log('Thread added with ID', docRef.id);
      // Message.THredID = docRef.id

    } catch (error) {
      console.error('Error adding thread', error);
    }
  }


  async updateThread() {
    console.log('Current Thread', this.threadServive.currentThread);
    console.log('Thread Collection', this.threadServive.threadCollection);
    console.log('ThreadMessage', this.threadServive.threadMessage);
    this.threadServive.threadMessage.timestamp = Timestamp.now();
    await updateDoc(
      doc(this.threadServive.threadCollection, this.threadServive.newThreadId),
      {
        content: this.threadServive.threadMessage // Update entire content array
      }
    );
    console.log('Updated Threadmessage', this.threadServive.threadMessage);

  }
}
