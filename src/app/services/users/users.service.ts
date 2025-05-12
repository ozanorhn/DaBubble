import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { User } from '../../classes/user.class';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, onSnapshot, updateDoc } from '@firebase/firestore';
import { LocalStorageService } from '../localStorage/local-storage.service';
// import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User as FirebaseUser } from '@angular/fire/auth';
import { Timestamp } from '@firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {

  private firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');

  users: User[] = [];
  tempUser: Partial<User> = {};
  currentUser: User = new User();

  GuestUser = {
    id: 'pEGZHQAC1HQNQQYnKNE1J04pbXM2',
    name: 'Guest',
    email: 'gast@test.de',
    avatar: '/assets/imgs/avatar9.jpg',
    online: true,
  }

  storedUser = new User();

  constructor(
    public localStorageS: LocalStorageService
  ) {
    this.storedUser = new User(this.localStorageS.loadObject('currentUser'));

    this.initUsersListener();

    this.updateOnlineStatus();
  }


  // async updateOnlineStatus() {


  //   setInterval(() => {
  //     this.storedUser = new User(this.localStorageS.loadObject('currentUser'));
  //     console.log('Interval log id', this.storedUser.id);


  //     await updateDoc(
  //       doc(this.usersCollection, this.storedUser.id),
  //       this.storedUser 
  //     );

  //   }, 30000)


  // }


  updateOnlineStatus() {
    setInterval(async () => {
      this.storedUser = new User(this.localStorageS.loadObject('currentUser'));
      if (!this.storedUser.id) return;
      const userRef = doc(this.usersCollection, this.storedUser.id);
      try {
        await updateDoc(userRef, {
          online: Timestamp.now()
        });
        console.log('Online-Status aktualisiert:', this.storedUser.id);
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Online-Status:', error);
      }
    }, 30000); // alle 30 Sekunden
  }



  private unsubscribe!: () => void;
  private initUsersListener() {
    this.unsubscribe = onSnapshot(this.usersCollection, (snapshot) => {
      this.users = snapshot.docs.map((doc) => {
        const data = doc.data() as User;
        data.id = doc.id;
        return data;
      });
    });
  }


  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  async addUser() {
    const user = new User(this.tempUser);
    try {
      const docRef = await addDoc(this.usersCollection, user.toJSON());
      console.log('User erstellt mit ID:', docRef.id);
    } catch (error) {
      console.error('Fehler beim Erstellen des Users:', error);
    }
  }


  setTempUser(data: Partial<User>) {
    this.tempUser = { ...this.tempUser, ...data };
    this.currentUser = { ...this.tempUser, ...data } as User;
    console.log('TempUser gesetzt:', this.tempUser);  // Überprüfe, ob der Avatar korrekt gesetzt wird
  }


  getTempUser() {
    return this.tempUser;
  }


  //E-Mail den User aus Firestore zurückgibt
  getUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  async updateUser(userId: string, updatedData: Partial<User>) {
    const userDocRef = doc(this.firestore, 'users', userId);
    try {
      await updateDoc(userDocRef, updatedData);
      console.log('User erfolgreich aktualisiert:', updatedData);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Users:', error);
      throw error;
    }
  }


  getUserById2(id: string): User | undefined {
    return this.users.find((user) => id === user.id);
  }


  fromCurrentUser(id: string): boolean {
    if (id === this.currentUser.id) {
      return true;
    } else {
      return false;
    }
  }
}
