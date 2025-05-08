import { Injectable, OnDestroy } from '@angular/core';
import { addDoc, collection, doc, DocumentData, DocumentReference, getDoc, onSnapshot, setDoc, Timestamp, Unsubscribe, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { UsersService } from '../users/users.service';
import { DirectMessage } from '../../classes/directMessage.class';
import { User } from '../../classes/user.class';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { ThreadsService } from '../threads/threads.service';
import { DM } from '../../interfaces/dm';
import { ThreadDMsService } from '../threadDMs/thread-dms.service';
import { Thread } from '../../classes/thread.class';




@Injectable({
  providedIn: 'root'
})
export class DirectMessagesService implements OnDestroy {
  othertUser: User = new User();
  docRef: DocumentReference<DocumentData, DocumentData> | undefined;
  private unsubscribeSnapshot: Unsubscribe | null = null;
  directMessage: DirectMessage = new DirectMessage({
    id: '',
    participants: {
      user1: '',
      user2: ''
    },
    content: []
  })

  newMessage = {
    threadId: '',
    message: '',
    sender: '',
    timestamp: Timestamp.now(),
    reactions: [],
  };

  currentUser
  directMessageCollection;

  currentDMIndex: number = 0;

  constructor(
    public firestore: Firestore,
    public usersService: UsersService,
    public localStorageS: LocalStorageService,
    public threadService: ThreadsService,
    public threadDMsService: ThreadDMsService
  ) {
    this.directMessageCollection = collection(this.firestore, 'directMessages');
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
  }


  /**
   * Generates a consistent DM ID based on sorted user IDs
   * @param {string} user1Id - First user ID
   * @param {string} user2Id - Second user ID
   * @returns {string} Formatted DM ID (dm_[id1]_[id2])
   */
  private getDirectMessageId(user1Id: string, user2Id: string): string {
    const sortedIds = [user1Id, user2Id].sort();
    return `dm_${sortedIds[0]}_${sortedIds[1]}`;
  }


  /**
   * Opens or creates a DM conversation with another user
   * @param {User} otherUser - The user to start conversation with
   */
  async openDMs(otherUser: User) {
    this.cleanupSnapshot();
    this.clearDm();
    this.othertUser = otherUser;
    await this.checkExistingIds();
    if (!this.docRef) {
      let tempId = this.getDirectMessageId(this.othertUser.id, this.currentUser.id);
      this.docRef = doc(this.directMessageCollection, tempId);
    }
    this.setupRealtimeListener();
  }


  /**
  * Clears current DM conversation data
  */
  clearDm() {
    this.docRef = undefined;
    this.directMessage = new DirectMessage({
      id: '',
      participants: {
        user1: '',
        user2: ''
      },
      content: []
    })
  }


  /**
   * Cleans up Firestore snapshot listener
   */
  private cleanupSnapshot(): void {
    if (this.unsubscribeSnapshot) {
      this.unsubscribeSnapshot();
      this.unsubscribeSnapshot = null;
    }
  }


  /**
  * Sets up realtime listener for DM conversation updates
  */
  private setupRealtimeListener(): void {
    if (!this.docRef) return;

    this.unsubscribeSnapshot = onSnapshot(this.docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        this.directMessage = new DirectMessage({
          id: docSnapshot.id,
          ...data
        });
        console.log('Echtzeit-Update:', this.directMessage);
      }
    }, (error) => {
      console.error('Fehler bei Echtzeit-Updates:', error);
    });
  }


  /**
   * Checks for existing DM conversations between current and other user
   */
  async checkExistingIds() {
    const dmIdUser1First = this.getDirectMessageId(this.othertUser.id, this.currentUser.id);
    const dmIdUser2First = this.getDirectMessageId(this.currentUser.id, this.othertUser.id);
    const dmDocRefUser1First = doc(this.directMessageCollection, dmIdUser1First);
    const dmDocRefUser2First = doc(this.directMessageCollection, dmIdUser2First);
    const user1FirstDoc = await getDoc(dmDocRefUser1First);
    const user2FirstDoc = await getDoc(dmDocRefUser2First);
    if (user1FirstDoc.exists()) {
      this.directMessage = new DirectMessage({
        id: dmIdUser1First,
        ...user1FirstDoc.data()
      });
      this.docRef = dmDocRefUser1First;
    } else if (user2FirstDoc.exists()) {
      this.directMessage = new DirectMessage({
        id: dmIdUser2First,
        ...user2FirstDoc.data()
      });
      this.docRef = dmDocRefUser2First;
    }
  }


  /**
   * Sends a new message in the current DM conversation
   * @throws {Error} If no active conversation exists
   */
  async sendDirectMessage(): Promise<void> {
    this.newMessage.timestamp = Timestamp.now();
    this.newMessage.sender = this.currentUser.id;
    if (this.docRef) {
      await setDoc(
        this.docRef,
        { content: [...this.directMessage.content, this.newMessage] },
        { merge: true } // Bestehende Daten nicht überschreiben
      );
      this.newMessage.message = '';
    }
  }


  /**
  * Angular lifecycle hook - cleans up resources
  */
  ngOnDestroy(): void {
    this.cleanupSnapshot();
  }


  // async openDmThread(index: number, message: DM) {
  //   this.currentDMIndex = index
  //   if (!this.directMessage.content[this.currentDMIndex].threadId) {
  //     // Erstelle neuen Thread falls nicht existiert
  //     await this.threadService.createThreadForDM(message);
  //     // this.directMessage.content.push(message)
  //     message.threadId = this.threadService.newThreadId

  //     await updateDoc(
  //           doc(this.directMessageCollection, this.directMessage.id),
  //           this.directMessage.content[this.currentDMIndex].message
  //         );

  //     console.log('New Message with ThreadID', message);

  //     // message.threadId = threadId;
  //   }
  // }



  // async openDmThread(index: number, message: DM) {
  //   console.log('openThread Message', message);

  //   this.currentDMIndex = index;
  //   const currentMessage = this.directMessage.content[this.currentDMIndex];
  //   if (!currentMessage.threadId) {
  //     await this.threadDMsService.createThreadForDM(message);
  //     currentMessage.threadId = this.threadService.newThreadId;
  //     try {
  //       await updateDoc(
  //         doc(this.directMessageCollection, this.directMessage.id),
  //         {
  //           [`content.${index}.threadId`]: currentMessage.threadId,
  //           [`content.${index}.threadMessage`]: currentMessage.message
  //         } 
  //       );
  //       console.log('Message updated with ThreadID', currentMessage);
  //     } catch (error) {
  //       console.error('Error updating message with ThreadID:', error);
  //       throw error;
  //     }
  //   } else {

  //   }



  async openDmThread(index: number, message: DM) {
    console.log('Opening thread for message:', message);

    this.currentDMIndex = index;
    const currentMessage = this.directMessage.content[this.currentDMIndex];

    if (!currentMessage.threadId) {  // Wenn noch kein Thread existiert
      const threadId = await this.createThread(currentMessage);   // 1. Thread erstellen
      await this.updateMessageWithThreadId(index, threadId);  // 2. Thread-ID in der Nachricht speichern
      this.openThreadView(threadId, currentMessage); // 3. Thread öffnen (können Sie später implementieren)
    } else {
      this.openThreadView(currentMessage.threadId, currentMessage);  // Thread existiert bereits - einfach öffnen
    }
  }

  private async createThread(message: any): Promise<string> {
    const threadData = new Thread({
      threadMessage: message.message,  // Originalnachricht oben im Thread
      content: [],                    // Leere Antworten-Liste
      createdAt: Timestamp.now()
    }).toJSON();
    const docRef = await addDoc(collection(this.firestore, 'threads'), threadData);
    return docRef.id; // Gibt die neue Thread-ID zurück
  }

  private async updateMessageWithThreadId(index: number, threadId: string) {
    await updateDoc(
      doc(this.directMessageCollection, this.directMessage.id),
      {
        [`content.${index}.threadId`]: threadId
      }
    );
  }

  private openThreadView(threadId: string, originalMessage: any) {
    // Hier können Sie die Logik zum Anzeigen des Threads implementieren
    console.log('Thread sollte jetzt geöffnet werden:', threadId);
    console.log('Originalnachricht:', originalMessage);
    // Beispiel: Navigation zum Thread-View oder Öffnen eines Dialogs
    // this.router.navigate(['/thread', threadId]);
  }



}



