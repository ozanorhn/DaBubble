import { Injectable } from '@angular/core';
import { collection, doc, getDoc, onSnapshot, Timestamp, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Thread } from '../../classes/thread.class';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
  threadCollection;
  currentThread: Thread = new Thread();
  unsubscribeFromThreads?: () => void;
  // unsubscribeSnapshot
  // newThreadId = '';

  chatType: 'channel' | 'dm' | '' = '';

  threadMessage = {
    message: '',
    sender: '',
    reactions: [],
    timestamp: Timestamp.now()
  }

  constructor(
    public firestore: Firestore
  ) {
    this.threadCollection = collection(this.firestore, 'threads');
  }



  async updateThread() {
    // console.log('Current Thread', this.currentThread);
    // console.log('Thread Collection', this.threadCollection);
    // console.log('ThreadMessage', this.threadMessage);
    // console.log('New THread ID', this.newThreadId);


    this.threadMessage.timestamp = Timestamp.now();
    await updateDoc(
      doc(this.threadCollection, this.currentThread?.threadId),
      {
        content: this.threadMessage // Update entire content array
      }
    );
    console.log('Updated Threadmessage', this.threadMessage);
  }



  // async getThread(threadId: string): Promise<Thread | undefined> {
  //   const docRef = doc(this.threadCollection, threadId);
  //   const snapshot = await getDoc(docRef);
  //   return snapshot.exists() ? new Thread(snapshot.data() as any) : undefined;
  // }


  async loadThreadById(threadId: string): Promise<any> {
    // const threadDocRef = doc(this.threadCollection, threadId);
    // const threadSnap = await getDoc(threadDocRef);
    // // console.log('WWWWWWWWWWWWWW      ', threadSnap.data() ? threadSnap.data() as Thread : undefined);
    // this.currentThread = threadSnap.data() ? threadSnap.data() as Thread : new Thread();
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

    const threadRef = doc(this.firestore, 'threads', threadId);

    this.unsubscribeFromThreads = onSnapshot(threadRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        data['id'] = docSnapshot.id;
  
        const thread = new Thread (data); // wenn du eine Thread-Klasse hast
        this.currentThread = thread
      } else {
        console.warn('Thread not found');
      }
    }, (error) => {
      console.error('Error listening to thread:', error);
    });
      
  }
}