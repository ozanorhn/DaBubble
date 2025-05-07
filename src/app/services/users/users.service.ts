import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { User } from '../../classes/user.class';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, onSnapshot, updateDoc } from '@firebase/firestore';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
// import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User as FirebaseUser } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {
  // private auth = inject(Auth);

  private firestore = inject(Firestore);
  // private authService = inject(AuthService);
  // private auth = inject(Auth);


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


  constructor(
    public localStorageService: LocalStorageService
  ) {
    this.initUsersListener();
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
    //console.log('Current User ???', this.tempUser);
    // this.authService.saveObject('currentUser',this.tempUser )
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
    // console.log(id);
    
    // console.log(this.users.find((user) => id === user.id));
    
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
