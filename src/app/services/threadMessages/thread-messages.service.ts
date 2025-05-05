import { Injectable } from '@angular/core';
import { Thread } from '../../classes/thread.class';
import { addDoc, collection, doc, Firestore, getDoc, Timestamp, updateDoc } from '@angular/fire/firestore';
import { ThreadsService } from '../threads/threads.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadMessagesService {

  constructor(
    public firestore: Firestore,
    public threadServive: ThreadsService
  ) {
    this.threadServive.threadCollection = collection(this.firestore, 'threads');
  }

  async loadThreadById(threadId: string): Promise<any> {
    if (threadId === '') {
      // erstelle neuen thread in der Firebase
      this.createThreadForMessage(this.threadServive.currentMessageId);
    } else {
      const threadDocRef = doc(this.threadServive.threadCollection, threadId);
      const threadSnap = await getDoc(threadDocRef);
      console.log('WWWWWWWWWWWWWW      ', threadSnap.data() ? threadSnap.data() as Thread : undefined);
      this.threadServive.currentThread = threadSnap.data() ? threadSnap.data() as Thread : undefined;
      // this.unsubscribeSnapshot = onSnapshot(this.docRef, (docSnapshot) => {
      //       if (docSnapshot.exists()) {
      //         const data = docSnapshot.data();
      //         this.directMessage = new DirectMessage({
      //           id: docSnapshot.id,
      //           ...data
      //         });
      //         console.log('Echtzeit-Update:', this.directMessage);
      //       }
      //     }, (error) => {
      //       console.error('Fehler bei Echtzeit-Updates:', error);
      //     });
    }
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
