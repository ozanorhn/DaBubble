import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Thread } from '../../classes/thread.class';
import { DM } from '../../interfaces/dm';
import { ThreadsService } from '../threads/threads.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadDMsService {

  constructor(
    public firestore: Firestore,
    public threadService: ThreadsService
  ) {
    this.threadService.threadCollection = collection(this.firestore, 'threads');
  }

  async loadThreadByIdDM(threadId: string): Promise<Thread | undefined> {
    if (threadId === '') {
      // erstelle neuen thread in der Firebase
      await this.createThreadForDM(this.threadService.currentMessage);
      return undefined;
    } else {
      const threadDocRef = doc(this.threadService.threadCollection, threadId);
      const threadSnap = await getDoc(threadDocRef);
      
      if (threadSnap.exists()) {
        // Hole die Daten und füge die ID hinzu
        const threadData = threadSnap.data() as Thread;
        this.threadService.currentThread = {
          ...threadData,
          threadId: threadSnap.id  // Füge die Dokument-ID hinzu
        } as Thread;
        
        console.log('Aktueller Thread:', this.threadService.currentThread);
        return this.threadService.currentThread;
      } else {
        this.threadService.currentThread = undefined;
        return undefined;
      }
    }
  }

  async createThreadForDM(message: DM) {
    console.log('Message ID', message);
    // console.log('Message ID', this.currentMessage.id)

    const thread = new Thread()
    console.log('current thread is', thread);
    try {
      const docRef = await addDoc(this.threadService.threadCollection, thread.toJSON());
      console.log('Thread added with ID', docRef.id);
      this.threadService.newThreadId = docRef.id
      //  this.dmService.newMessage.threadId = docRef.id
      //  console.log('dm new Message', this.dmService.newMessage.threadId);

    } catch (error) {
      console.error('Error adding thread', error);
    }
  }
}
