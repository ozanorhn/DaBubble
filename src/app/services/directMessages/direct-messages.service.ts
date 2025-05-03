import { Injectable } from '@angular/core';
import { addDoc, collection, doc, DocumentData, DocumentReference, getDoc, setDoc, Timestamp } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { UsersService } from '../users/users.service';
import { DirectMessage } from '../../classes/directMessage.class';
import { User } from '../../classes/user.class';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DirectMessagesService {
  othertUser: User = new User();
  docRef: DocumentReference<DocumentData, DocumentData> | undefined;

  directMessage: DirectMessage = new DirectMessage({
    id: '',
    participants: {
      user1: '',
      user2: ''
    },
    content: []
  })

  newMessage = {
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
    public localStorageS: LocalStorageService
  ) {
    this.directMessageCollection = collection(this.firestore, 'directMessages');
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
  }


  // Generiert eine konsistente ID für die DM basierend auf den User-IDs
  private getDirectMessageId(user1Id: string, user2Id: string): string {
    const sortedIds = [user1Id, user2Id].sort();
    return `dm_${sortedIds[0]}_${sortedIds[1]}`;
  }

  // Öffnet/erstellt eine DM zwischen dem aktuellen User und einem anderen User
  async openDMs(otherUser: User) { // : Promise<DirectMessage>
    // const currentUserId = this.usersService.tempUser.id;
    this.directMessage = new DirectMessage({
      id: '',
      participants: {
        user1: '',
        user2: ''
      },
      content: []
    })
    this.othertUser = otherUser;

    // if (!this.othertUser.id || !this.usersService.tempUser.id) {
    //   throw new Error('User IDs are required');
    // }

    let tempId1 = this.getDirectMessageId(this.othertUser.id, this.currentUser.id);
    let tempId2 = this.getDirectMessageId(this.currentUser.id, this.othertUser.id);
    const dmDocRef = doc(this.directMessageCollection, tempId1);
    const dmDocRef2 = doc(this.directMessageCollection, tempId2);


    // // Prüfen, ob die DM bereits existiert
    const dmSnapshot = await getDoc(dmDocRef);

    if (dmSnapshot.exists()) {
      // DM existiert - Daten zurückgeben
      this.directMessage = new DirectMessage({
        id: tempId1,
        ...dmSnapshot.data()
      });
      this.docRef = dmDocRef;

    } else if (dmSnapshot.exists()) {
      // DM existiert - Daten zurückgeben
      this.directMessage = new DirectMessage({
        id: tempId2,
        ...dmSnapshot.data()
      });
      this.docRef = dmDocRef2;
    }
    console.log('DM:', this.directMessage);

  }


  async sendDirectMessage(): Promise<void> {
    // console.log('DM TempUser: ', this.usersService.tempUser.id);

    const dmId = this.getDirectMessageId(this.currentUser.id, this.othertUser.id);
    const dmDocRef = doc(this.directMessageCollection, dmId);

    this.newMessage.timestamp = Timestamp.now();
    this.newMessage.sender = this.currentUser.id;
    console.log('NewMessage: ', this.newMessage);
    // Nochmaö checken, ob Id vorhanden ist.
    
    // Firestore-Operation: Array um neuen Eintrag erweitern
    await setDoc(
      dmDocRef,
      { content: [...this.directMessage.content, this.newMessage] },
      { merge: true } // Bestehende Daten nicht überschreiben
    );
    this.newMessage.message = '';
  }

}
