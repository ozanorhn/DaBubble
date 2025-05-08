import { Injectable, OnDestroy } from '@angular/core';
import { collection, doc, DocumentData, DocumentReference, getDoc, onSnapshot, QueryDocumentSnapshot, setDoc, Timestamp, Unsubscribe, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { UsersService } from '../users/users.service';
import { DirectMessage } from '../../classes/directMessage.class';
import { User } from '../../classes/user.class';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { ThreadsService } from '../threads/threads.service';
import { ThreadDMsService } from '../threadDMs/thread-dms.service';

@Injectable({
  providedIn: 'root'
})
export class DirectMessagesService implements OnDestroy {
  othertUser: User = new User();
  docRef: DocumentReference<DocumentData, DocumentData> | undefined;
  currentUser;
  directMessageCollection;
  currentDMIndex: number = 0;

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
      this.setDocRef(dmIdUser1First, user1FirstDoc, dmDocRefUser1First);
    } else if (user2FirstDoc.exists()) {
      this.setDocRef(dmIdUser2First, user2FirstDoc, dmDocRefUser2First);
    } else {
      await this.createDocRef();
    }
  }


  /**
   * Creates a new Firestore document for a direct message conversation.
   */
  async createDocRef() {
    const tempId = this.getDirectMessageId(this.othertUser.id, this.currentUser.id);
    this.directMessage.id = tempId;
    this.docRef = doc(this.directMessageCollection, tempId);
    await setDoc(this.docRef, {
      id: tempId,
      participants: {
        user1: this.currentUser.id,
        user2: this.othertUser.id
      },
      content: []
    });
  }


  /**
 * Sets the document reference and loads its data.
 * @param {string} id - The DM document ID.
 * @param {QueryDocumentSnapshot} doc - Firestore document snapshot.
 * @param {DocumentReference} ref - Firestore document reference.
 */
  setDocRef(id: string, doc: QueryDocumentSnapshot<DocumentData, DocumentData>, ref: DocumentReference<DocumentData, DocumentData>) {
    this.directMessage = new DirectMessage({
      id: id,
      ...doc.data()
    });
    this.docRef = ref;
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
        { merge: true }
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


  /**
  * Opens the thread related to a specific direct message.
  * Creates a new thread if one does not exist.
  * @param {number} index - Index of the message in the DM content array.
  */
  async openDmThread(index: number) {
    this.currentDMIndex = index;
    const currentMessage = this.directMessage.content[this.currentDMIndex];
    if (!currentMessage.threadId) {
      await this.threadDMsService.createThreadForDM(currentMessage);
      const newThreadId = this.threadService.currentThread?.().threadId;
      if (newThreadId) {
        this.directMessage.content[this.currentDMIndex].threadId = newThreadId;
        this.updateDM(newThreadId)
      }
    } else {
      await this.threadService.loadThreadById(currentMessage.threadId);
    }
  }


  /**
   * Updates the DM document in Firestore with the new thread ID.
   * @param {any} threadId - The ID of the associated thread.
   */
  async updateDM(threadId: any) {
    try {
      await updateDoc(
        doc(this.directMessageCollection, this.directMessage.id),
        { content: this.directMessage.content }
      );
      await this.threadService.loadThreadById(threadId);
    } catch (error) {
      console.error('Fehler beim Aktualisieren der ThreadID in Firestore:', error);
    }
  }


  /**
   * Updates the current thread and synchronizes the response data in the DM.
   */
  async updateThread() {
    console.log(this.threadService.threadMessage);
    const threadData = await this.threadDMsService.updateThread();
    this.directMessage.content[this.currentDMIndex].answers = threadData.answers;
    this.directMessage.content[this.currentDMIndex].lastAnswer = threadData.lastAnswer;
    this.updateDM(this.threadDMsService.threadService.currentThread().threadId)
  }
}