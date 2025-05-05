import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDoc, onSnapshot, Unsubscribe, updateDoc } from '@angular/fire/firestore';
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

  // async loadThreadByIdDM(threadId: string) { //: Promise<Thread | undefined>
  //   console.log('ThreadId: ', threadId);
    
  //   if (threadId === '') {
  //     // erstelle neuen thread in der Firebase
  //     await this.createThreadForDM(this.threadService.currentMessage);
  //     return undefined;
  //   } else {
  //     const threadDocRef = doc(this.threadService.threadCollection, threadId);
  //     const threadSnap = await getDoc(threadDocRef);

  //     // if (threadSnap.exists()) {
  //     //   // Hole die Daten und füge die ID hinzu
  //     //   const threadData = threadSnap.data() as Thread;
  //     //   this.threadService.currentThread = {
  //     //     ...threadData,
  //     //     threadId: threadSnap.id  // Füge die Dokument-ID hinzu
  //     //   } as Thread;
  //     //   console.log('Aktueller Thread:', this.threadService.currentThread);
  //     //   return this.threadService.currentThread;
  //     // } else {
  //     //   this.threadService.currentThread = undefined;
  //     //   return undefined;
  //     // }
  //   }
  // }

  async createThreadForDM(message: DM) {
    console.log('Message ID', message);
    // console.log('Message ID', this.currentMessage.id)
    const thread = new Thread()
    console.log('current thread is', thread);
    try {
      const docRef = await addDoc(this.threadService.threadCollection, thread.toJSON());
      console.log('Thread added with ID', docRef.id);
      this.threadService.newThreadId = docRef.id

      await updateDoc(
        doc(this.threadService.threadCollection, docRef.id),
        { threadId: this.threadService.newThreadId }
      );

    } catch (error) {
      console.error('Error adding thread', error);
    }
  }


  
  // public setupRealtimeListener(id:string): void {
  //   if (!id) return;

  //   this.unsubscribeSnapshot = onSnapshot(this.threadService.threadCollection, (docSnapshot) => {
  //     if (docSnapshot.exists()) {
  //       const data = docSnapshot.data();
  //       this.directMessage = new DirectMessage({
  //         id: docSnapshot.id,
  //         ...data
  //       });
  //       console.log('Echtzeit-Update:', this.directMessage);
  //     }
  //   }, (error) => {
  //     console.error('Fehler bei Echtzeit-Updates:', error);
  //   });
  // }

}
