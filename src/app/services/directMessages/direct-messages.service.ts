import { inject, Injectable, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
import { collection, CollectionReference, doc, DocumentData, DocumentReference, DocumentSnapshot, getDoc, onSnapshot, query, QueryDocumentSnapshot, setDoc, Timestamp, Unsubscribe, updateDoc, where } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { UsersService } from '../users/users.service';
import { DirectMessage } from '../../classes/directMessage.class';
import { User } from '../../classes/user.class';
import { ThreadsService } from '../threads/threads.service';
import { ThreadDMsService } from '../threadDMs/thread-dms.service';
import { MainNavService } from '../../pageServices/navigates/main-nav.service';

@Injectable({
  providedIn: 'root'
})
export class DirectMessagesService implements OnInit, OnDestroy {
  otherUser: User = new User();
  docRef: DocumentReference<DocumentData, DocumentData> | undefined;
  directMessageCollection;
  currentDMIndex: number = 0;
  mobile = false;
  dmClicked = signal(false);
  searchDMs: DirectMessage[] = [];
  searched = false;

  private unsubscribeSnapshot: Unsubscribe | null = null;
  private unsubscribeSeatchableDMs: Unsubscribe | null = null;

  directMessage: DirectMessage = new DirectMessage({
    id: '',
    content: []
  })

  newMessage = {
    threadId: '',
    message: '',
    sender: '',
    timestamp: Timestamp.now(),
    reactions: [],
  };

  // firestore: Firestore | undefined;

  firestore = inject(Firestore);

  ngOnInit(): void {
    // this.firestore = inject(Firestore)
    //  if (this.firestore) {
    //   this.directMessageCollection = collection(this.firestore, 'directMessages');
    // }
    // this.directMessageCollection = collection(this.firestore, 'directMessages');
  }

  constructor(
    // public firestore: Firestore,
    public usersService: UsersService,
    public threadService: ThreadsService,
    public threadDMsService: ThreadDMsService,
    public mainNavService: MainNavService,
    private ngZone: NgZone
  ) {
    // if (this.firestore) {
    this.directMessageCollection = collection(this.firestore, 'directMessages');
    // }
  }


  // getSearchableDMs() {
  //   this.resetSearchParameter();
  //   const q = this.queryForSearch();
  //   if (this.firestore && this.directMessageCollection) {
  //     this.unsubscribeSeatchableDMs = onSnapshot(q, (snapshot) => {
  //       this.ngZone.run(() => {
  //         this.searchDMs = snapshot.docs.map(doc => ({
  //           id: doc.id,
  //           ...doc.data()
  //         } as DirectMessage));
  //       });
  //     }, (error) => {
  //       console.error('Fehler beim Abrufen der DMs:', error);
  //     });

  //   }
  // }

  getSearchableDMs() {
    this.resetSearchParameter();
    const q = this.queryForSearch();

    this.cleanUpSearchSnapshot(); // Alten Listener bereinigen

    this.unsubscribeSeatchableDMs = onSnapshot(
      q,
      {
        next: (snapshot) => {
          this.ngZone.run(() => {
            this.searchDMs = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            } as DirectMessage));
          });
        },
        error: (error) => {
          console.error('Fehler beim Abrufen der DMs:', error);
        }
      }
    );
  }


  queryForSearch() {
    return query(
      this.directMessageCollection,
      where('participants', 'array-contains', this.usersService.currentUser.id)
    );
  }


  resetSearchParameter() {
    this.searched = true;
    this.cleanUpSearchSnapshot();
    this.searchDMs = [];
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
    this.otherUser = otherUser;
    this.cleanupSnapshot();
    this.clearDm();
    await this.checkExistingIds();
    this.manageNavigation();
    this.checkDocRef();
    this.setupRealtimeListener();
  }


  checkDocRef() {
    if (!this.docRef) {
      let tempId = this.getDirectMessageId(this.otherUser.id, this.usersService.currentUser.id);
      this.docRef = doc(this.firestore, 'directMessages', tempId);
    }
  }


  manageNavigation() {
    this.dmClicked.set(true);
    if (this.mobile) {
      this.mainNavService.nav.set(false);
      this.mainNavService.showAltLogo = false;
    }
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
   * Cleans up Firestore snapshot listeners
   */
  private cleanupSnapshot(): void {
    if (this.unsubscribeSnapshot) {
      this.unsubscribeSnapshot();
      this.unsubscribeSnapshot = null;
    }
  }


  public cleanUpSearchSnapshot() {
    if (this.unsubscribeSeatchableDMs) {
      this.unsubscribeSeatchableDMs();
      this.unsubscribeSeatchableDMs = null;
      this.searched = false;
    }
    this.searchDMs = [];
  }


  /**
  * Sets up realtime listener for DM conversation updates
  */
  // private setupRealtimeListener(): void {
  //   if (!this.docRef) return;

  //   this.unsubscribeSnapshot = onSnapshot(this.docRef, (docSnapshot) => {
  //     this.ngZone.run(() => {
  //       if (docSnapshot.exists()) {
  //         const data = docSnapshot.data();
  //         this.directMessage = new DirectMessage({
  //           id: docSnapshot.id,
  //           ...data
  //         });
  //         console.log('Echtzeit-Update:', this.directMessage);
  //       }
  //     });
  //   }, (error) => {
  //     console.error('Fehler bei Echtzeit-Updates:', error);
  //   });
  // }

  // private setupRealtimeListener(): void {
  //   if (!this.docRef) return;

  //   this.unsubscribeSnapshot = onSnapshot(this.docRef, (docSnapshot) => {
  //     this.ngZone.run(() => {
  //       if (docSnapshot.exists()) {
  //         const data = docSnapshot.data();
  //         this.directMessage = new DirectMessage({
  //           id: docSnapshot.id,
  //           ...data
  //         });
  //       }
  //     });
  //   });
  // }

  private setupRealtimeListener(): void {
    if (!this.docRef) return;

    this.cleanupSnapshot(); // Alte Listener immer erst entfernen

    this.unsubscribeSnapshot = onSnapshot(this.docRef, {
      next: (docSnapshot) => {
        this.ngZone.run(() => this.handleSnapshot(docSnapshot));
      },
      error: (error) => {
        this.ngZone.run(() => {
          console.error('Fehler:', error);
          if (error.code === 'unavailable') {
            setTimeout(() => this.setupRealtimeListener(), 2000);
          }
        });
      }
    });
  }

  private handleSnapshot(docSnapshot: DocumentSnapshot) {
    if (docSnapshot.exists()) {
      this.directMessage = new DirectMessage({
        id: docSnapshot.id,
        ...docSnapshot.data()
      });
    }
  }

  /**
   * Checks for existing DM conversations between current and other user
   */
  // async checkExistingIds() {
  //   console.log('checkExistingIds', this.otherUser.id, ' und ', this.usersService.currentUser.id);

  //   const dmIdUser1First = this.getDirectMessageId(this.otherUser.id, this.usersService.currentUser.id);
  //   const dmIdUser2First = this.getDirectMessageId(this.usersService.currentUser.id, this.otherUser.id);
  //   const dmDocRefUser1First = doc(this.directMessageCollection, dmIdUser1First);
  //   const dmDocRefUser2First = doc(this.directMessageCollection, dmIdUser2First);
  //   const user1FirstDoc = await getDoc(dmDocRefUser1First);
  //   const user2FirstDoc = await getDoc(dmDocRefUser2First);
  //   if (user1FirstDoc.exists()) {
  //     this.setDocRef(dmIdUser1First, user1FirstDoc, dmDocRefUser1First);
  //   } else if (user2FirstDoc.exists()) {
  //     this.setDocRef(dmIdUser2First, user2FirstDoc, dmDocRefUser2First);
  //   } else {
  //     await this.createDocRef();
  //   }
  // }

  async checkExistingIds() {
    const dmId = this.getDirectMessageId(this.otherUser.id, this.usersService.currentUser.id);
    const docRef = doc(this.firestore, 'directMessages', dmId);

    try {
      const docSnap = await this.ngZone.run(() => getDoc(docRef));
      if (docSnap.exists()) {
        this.setDocRef(dmId, docSnap, docRef);
      } else {
        await this.createDocRef();
      }
    } catch (error) {
      this.ngZone.run(() => console.error('Fehler:', error));
    }
  }


  /**
   * Creates a new Firestore document for a direct message conversation.
   */
  async createDocRef() {
    const tempId = this.getDirectMessageId(this.otherUser.id, this.usersService.currentUser.id);
    this.directMessage.id = tempId;
    this.docRef = doc(this.firestore, 'directMessages', tempId);
    await setDoc(this.docRef, {
      id: tempId,
      participants: [this.usersService.currentUser.id, this.otherUser.id],
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
    this.newMessage.sender = this.usersService.currentUser.id;
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
    this.cleanUpSearchSnapshot();
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
  // async updateDM(threadId: any = '') {
  //   try {
  //     await updateDoc(
  //       doc(this.directMessageCollection, this.directMessage.id),
  //       { content: this.directMessage.content }
  //     );
  //     if (threadId !== '') await this.threadService.loadThreadById(threadId);
  //   } catch (error) {
  //     console.error('Fehler beim Aktualisieren der ThreadID in Firestore:', error);
  //   }
  // }

  async updateDM(threadId: string = ''): Promise<void> {
    if (!this.directMessage?.id) {
      throw new Error('directMessage.id ist nicht definiert.');
    }
    try {
      // ✅ Korrekte Dokumentreferenz mit modularer Syntax
      const docRef = doc(this.firestore, 'directMessages', this.directMessage.id);

      // ✅ Firebase-Operation in NgZone für korrekte Change Detection
      await this.ngZone.run(() => updateDoc(
        docRef,
        { content: this.directMessage.content }
      ));

      // ✅ Thread nur laden wenn ID existiert
      if (threadId) {
        await this.threadService.loadThreadById(threadId);
      }
    } catch (error) {
      // ✅ Error Handling in NgZone
      this.ngZone.run(() => {
        console.error('Fehler beim Aktualisieren der ThreadID:', error);
        // Optional: Benutzerfeedback z.B. via Snackbar
      });
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