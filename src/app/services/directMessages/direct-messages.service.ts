import { Injectable, OnDestroy } from '@angular/core';
import { addDoc, collection, doc, DocumentData, DocumentReference, getDoc, onSnapshot, setDoc, Timestamp, Unsubscribe } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { UsersService } from '../users/users.service';
import { DirectMessage } from '../../classes/directMessage.class';
import { User } from '../../classes/user.class';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { ThreadsService } from '../threads/threads.service';


export interface DM {
  threadId: string;
  message: string;
  sender: string;
  timestamp: Timestamp;
  reactions: any[]; 
}

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

  constructor(
    public firestore: Firestore,
    public usersService: UsersService,
    public localStorageS: LocalStorageService,
    public threadService: ThreadsService
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


  async openDmThread(index: number, message: DM) {
    if (!message.threadId) {
      // Erstelle neuen Thread falls nicht existiert
      const threadId = await this.threadService.createThreadForMessage(message.id);
      console.log('onMessageClick Message id to Thread createThreadForMessage',message.id);
      
      // message.threadId = threadId;
    }
  }
}
