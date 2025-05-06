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

  async createThreadForDM(message: DM): Promise<string | null> {
    try {
      const threadData = new Thread({
        createdAt: Timestamp.now(),
        participants: [message.sender], // ggf. beide UserIDs ergänzen
      });

      const threadsCollection = collection(this.firestore, 'threads');
      const docRef = await addDoc(threadsCollection, threadData.toJSON());

      const threadId = docRef.id;

      // Setze aktuelle Thread-Referenz für den Zugriff
      threadData.threadId = threadId;
      this.threadService.currentThread.set(threadData);

      return threadId;
    } catch (error) {
      console.error('Fehler beim Erstellen eines DM-Threads:', error);
      return null;
    }
  }

}
