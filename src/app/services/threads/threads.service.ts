import { forwardRef, Inject, inject, Injectable, Injector } from '@angular/core';
import { addDoc, arrayUnion, collection, doc, getDoc, onSnapshot, Timestamp, Unsubscribe, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Thread } from '../../classes/thread.class';
import { update } from '@angular/fire/database';
import { MessagesService } from '../messages/messages.service';
import { Message } from '../../classes/message.class';
import { DM } from '../../interfaces/dm';
import { DirectMessagesService } from '../directMessages/direct-messages.service';
// import { ThreadMessagesService } from '../threadMessages/thread-messages.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
  threadCollection;
  currentThread: Thread | undefined = new Thread();
  currentMessageId: string = '';
  currentMessage = new Message();
  // unsubscribeSnapshot
  newThreadId = '';

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
    console.log('Current Thread', this.currentThread);
    console.log('Thread Collection', this.threadCollection);
    console.log('ThreadMessage', this.threadMessage);
    this.threadMessage.timestamp = Timestamp.now();
    await updateDoc(
      doc(this.threadCollection, this.newThreadId),
      {
        content: this.threadMessage // Update entire content array
      }
    );
    console.log('Updated Threadmessage', this.threadMessage);
  }


  
  async getThread(threadId: string): Promise<Thread | undefined> {
    const docRef = doc(this.threadCollection, threadId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? new Thread(snapshot.data() as any) : undefined;
  }




  // async onMessageClick(message: Message) {
  //   console.log('Message:  ', message);
    
  //   this.currentMessage = message;
  //   if (!message.threadId) {
  //     // Erstelle neuen Thread falls nicht existiert
  //     if(this.chatType == 'channel'){
  //       const threadId = await this.threadMessage.createThreadForMessage(message.id);
  //     } else if (this.chatType === 'dm'){
  //       const threadId = await this.threadMessage.createThreadForDM(message.id);
  //     }
     
  //     console.log('onMessageClick Message id to Thread createThreadForMessage',message.id);
      
  //     // message.threadId = threadId;
  //   }
    
    // Lade den Thread
    // this.currentThread = await this.threadService.getThread(message.threadId);
  }

  // async loadThreadById(threadId: string): Promise<any> {
  //   if (threadId === '') {
  //     // erstelle neuen thread in der Firebase
  //     this.createThreadForMessage(this.currentMessageId);
  //   } else {
  //     const threadDocRef = doc(this.threadCollection, threadId);
  //     const threadSnap = await getDoc(threadDocRef);
  //     console.log('WWWWWWWWWWWWWW      ', threadSnap.data() ? threadSnap.data() as Thread : undefined);
  //     this.currentThread = threadSnap.data() ? threadSnap.data() as Thread : undefined;



  //     // this.unsubscribeSnapshot = onSnapshot(this.docRef, (docSnapshot) => {
  //     //       if (docSnapshot.exists()) {
  //     //         const data = docSnapshot.data();
  //     //         this.directMessage = new DirectMessage({
  //     //           id: docSnapshot.id,
  //     //           ...data
  //     //         });
  //     //         console.log('Echtzeit-Update:', this.directMessage);
  //     //       }
  //     //     }, (error) => {
  //     //       console.error('Fehler bei Echtzeit-Updates:', error);
  //     //     });
  //   }
  // }




  // async loadThreadByIdDM(threadId: string): Promise<Thread | undefined> {
  //   if (threadId === '') {
  //     // erstelle neuen thread in der Firebase
  //     await this.createThreadForDM(this.currentMessageId);
  //     return undefined;
  //   } else {
  //     const threadDocRef = doc(this.threadCollection, threadId);
  //     const threadSnap = await getDoc(threadDocRef);
      
  //     if (threadSnap.exists()) {
  //       // Hole die Daten und füge die ID hinzu
  //       const threadData = threadSnap.data() as Thread;
  //       this.currentThread = {
  //         ...threadData,
  //         threadId: threadSnap.id  // Füge die Dokument-ID hinzu
  //       } as Thread;
        
  //       console.log('Aktueller Thread:', this.currentThread);
  //       return this.currentThread;
  //     } else {
  //       this.currentThread = undefined;
  //       return undefined;
  //     }
  //   }
  // }

  // private threadUnsubscribe: Unsubscribe | null = null;

  // async loadThreadById(threadId: string): Promise<Thread | undefined> {
  //   // Zuerst bestehende Subscription beenden
  //   if (this.threadUnsubscribe) {
  //     this.threadUnsubscribe();
  //     this.threadUnsubscribe = null;
  //   }
  
  //   if (threadId === '') {
  //     // Neuen Thread erstellen
  //     await this.createThreadForMessage(this.currentMessageId);
  //     return undefined;
  //   }
  
  //   return new Promise((resolve) => {
  //     const threadDocRef = doc(this.threadCollection, threadId);
      
  //     this.threadUnsubscribe = onSnapshot(threadDocRef, (threadSnap) => {
  //       if (threadSnap.exists()) {
  //         this.currentThread = {
  //           ...threadSnap.data() as Thread,
  //           threadId: threadSnap.id  // Dokument-ID hinzufügen
  //         } as Thread;
  //         console.log('Aktueller Thread (Live Update):', this.currentThread);
  //         resolve(this.currentThread);
  //       } else {
  //         this.currentThread = undefined;
  //         resolve(undefined);
  //       }
  //     }, (error) => {
  //       console.error("Fehler beim Abonnieren des Threads:", error);
  //       });
  //   });
  // }



  // async createThreadForMessage(MessageId: string) {
  //   console.log('Message ID', MessageId);
  //   console.log('Message ID', this.currentMessage.id)

  //   const thread = new Thread({ messageId: MessageId })
  //   console.log('current thread is', thread);
  //   try {
  //     const docRef = await addDoc(this.threadCollection, thread.toJSON());
  //     console.log('Thread added with ID', docRef.id);
  //     // Message.THredID = docRef.id
  //   } catch (error) {
  //     console.error('Error adding thread', error);
  //   }
  // }



  // await updateDoc(
  //   doc(this.directMessageCollection, this.directMessage.id),
  //   {
  //     content: this.directMessage.content // Update entire content array
  //   }
  // );


  // async createThreadForDM(message: DM) {
  //   console.log('Message ID', message);
  //   // console.log('Message ID', this.currentMessage.id)

  //   const thread = new Thread()
  //   console.log('current thread is', thread);
  //   try {
  //     const docRef = await addDoc(this.threadCollection, thread.toJSON());
  //     console.log('Thread added with ID', docRef.id);
  //     this.newThreadId = docRef.id
  //     //  this.dmService.newMessage.threadId = docRef.id
  //     //  console.log('dm new Message', this.dmService.newMessage.threadId);

  //   } catch (error) {
  //     console.error('Error adding thread', error);
  //   }
  // }




  // watchThread(threadId: string): void {
  //   this.unsubscribeThread(); // Vorherigen Listener entfernen

  //   const threadRef = doc(this.threadCollection, threadId);

  //   this.threadUnsubscribe = onSnapshot(threadRef, (snapshot) => {
  //     if (snapshot.exists()) {
  //       const threadData = snapshot.data();
  //       const thread = new Thread({
  //         ...threadData,
  //         threadId: snapshot.id
  //       });
  //       this.currentThread$.next(thread);
  //     } else {
  //       this.currentThread$.next(null);
  //     }
  //   }, (error) => {
  //     console.error('Thread watch error:', error);
  //   });
  // }

  // async addThreadMessage(threadId: string, message: DM): Promise<void> {
  //   const threadRef = doc(this.threadCollection, threadId);
  //   await updateDoc(threadRef, {
  //     content: arrayUnion(message)
  //   });
  // }

  // await updateDoc(
  //       doc(this.channelsCollection, channel.id),
  //       channelData
  //     );
// }