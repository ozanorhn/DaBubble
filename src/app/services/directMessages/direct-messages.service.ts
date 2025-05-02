import { Injectable } from '@angular/core';
import { addDoc, collection, doc, DocumentData, DocumentReference, getDoc, setDoc, Timestamp } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { UsersService } from '../users/users.service';
import { DirectMessage } from '../../classes/directMessage.class';
import { User } from '../../classes/user.class';
import { Message } from '../../classes/message.class';

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

  directMessageCollection;

  constructor(
    public firestore: Firestore,
    public usersService: UsersService
  ) {
    this.directMessageCollection = collection(this.firestore, 'directMessages');
    if (this.usersService.tempUser.id !== undefined) {
      this.directMessage.participants.user1 = this.usersService.tempUser.id;
    }
  }


  // openDMs(user: User){
  //   this.currentUser = user;
  // }



  // getDirectMessageId(user1Id: string, user2Id: string): string {
  //   const sortedIds = [user1Id, user2Id].sort();
  //   return `dm_${sortedIds[0]}_${sortedIds[1]}`;
  // }

  // async getDirectMessage(user1Id: string, user2Id: string): Promise<DirectMessage> {
  //   const docId = getDirectMessageId(user1Id, user2Id);
  //   const doc = await firestore.collection('directMessages').doc(docId).get();

  //   if (doc.exists) {
  //     return new DirectMessage(doc.data());
  //   } else {
  //     // Neue Nachricht erstellen
  //     return new DirectMessage({
  //       id: docId,
  //       participants: { user1: user1Id, user2: user2Id },
  //       content: []
  //     });
  //   }
  // }


  // Generiert eine konsistente ID für die DM basierend auf den User-IDs
  private getDirectMessageId(user1Id: string, user2Id: string): string {
    const sortedIds = [user1Id, user2Id].sort();
    return `dm_${sortedIds[0]}_${sortedIds[1]}`;
  }

  // Öffnet/erstellt eine DM zwischen dem aktuellen User und einem anderen User
  async openDMs(otherUser: User) { // : Promise<DirectMessage>
    // const currentUserId = this.usersService.tempUser.id;

    this.othertUser = otherUser;

    if (!this.othertUser.id || !this.usersService.tempUser.id) {
      throw new Error('User IDs are required');
    }

    let tempId1 = this.getDirectMessageId(this.othertUser.id, this.usersService.tempUser.id);
    let tempId2 = this.getDirectMessageId(this.usersService.tempUser.id, this.othertUser.id);
    const dmDocRef = doc(this.directMessageCollection,  tempId1);
    const dmDocRef2 = doc(this.directMessageCollection,  tempId2);


    // // Prüfen, ob die DM bereits existiert
    const dmSnapshot = await getDoc(dmDocRef);

    if (dmSnapshot.exists()) {
      // DM existiert - Daten zurückgeben
      this.directMessage = new DirectMessage({
        id: tempId1,
        ...dmSnapshot.data()
      });
      this.docRef = dmDocRef;
      // return new DirectMessage({
      //   id: tempId1,
      //   ...dmSnapshot.data()
      // });
    } else if (dmSnapshot.exists()) {
      // DM existiert - Daten zurückgeben
      this.directMessage = new DirectMessage({
        id: tempId2,
        ...dmSnapshot.data()
      });
      this.docRef = dmDocRef2;
    } 
    console.log('DM:', this.directMessage);
    
    //else {
    // //   // Neue DM erstellen
    // //   const newDM = new DirectMessage({
    // //     id: dmId,
    // //     participants: {
    // //       user1: currentUserId,
    // //       user2: otherUser.id
    // //     },
    // //     content: []
    //   });

    //   // DM in Firebase speichern
    //   await setDoc(dmDocRef, newDM);
    //   return newDM;
  //   }
  }





  getDirectMessage() {

  }



  // async sendDirectMessage() {
  //   console.log('current directMessage is', this.directMessage);
  //   try {
  //     const docRef = await addDoc(this.directMessageCollection, this.directMessage)
  //     console.log('DirectMessage added with ID', docRef.id);
  //   } catch (error) {
  //     console.error('Error adding directMessage', error);
  //   }
  // }



  async sendDirectMessage(): Promise<void> {
    console.log('DM TempUser: ', this.usersService.tempUser.id);

    if (this.usersService.tempUser.id !== undefined) {

      const currentUserId = this.usersService.tempUser.id;
      const dmId = this.getDirectMessageId(currentUserId, this.othertUser.id);
      const dmDocRef = doc(this.directMessageCollection, dmId);

      // Nachricht zum Content-Array hinzufügen
      // const newMessage = {
      //   content: this.directMessage.content,
      //   timestamp: new Date().toString(),
      //   senderId: currentUserId
      // }
      this.newMessage.timestamp = Timestamp.now();
      this.newMessage.sender = this.usersService.tempUser.id;
      console.log('NewMessage: ', this.newMessage);

      // Firestore-Operation: Array um neuen Eintrag erweitern
      await setDoc(
        dmDocRef,
        { content: [...this.directMessage.content, this.newMessage] },
        { merge: true } // Bestehende Daten nicht überschreiben
      );
    };
  }

}
