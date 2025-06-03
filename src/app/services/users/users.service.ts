import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { User } from '../../classes/user.class';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, onSnapshot, updateDoc } from '@firebase/firestore';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Timestamp } from '@firebase/firestore';
import { query, where, getDocs } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {
  private onlineUsers = new BehaviorSubject<User[]>([]);
  onlineUsers$ = this.onlineUsers.asObservable();
  private previousOnlineStatus: { [key: string]: boolean } = {};
  private unsubscribe: () => void = () => { }; // Initialisierung hinzufügen
  private firestore = inject(Firestore);
  usersCollection = collection(this.firestore, 'users');
  users: User[] = [];
  tempUser: Partial<User> = {};
  currentUser: User = new User();
  GuestUser = {
    id: 'ALomQ9jH69QnE7Q7zjnA',
    name: 'Gast',
    email: 'gast@user.de',
  }


  constructor(
    public localStorageS: LocalStorageService
  ) {
    this.initUsersListener();
    this.updateOnlineStatus();
  }


  // getCurrentUser() {
  //     this.currentUser = new User(this.localStorageS.loadObject('currentUser'));
  // }


  private initUsersListener() {
    this.unsubscribe = onSnapshot(this.usersCollection, (snapshot) => {
      const users = snapshot.docs.map(doc => {
        const data = doc.data() as User;
        data.id = doc.id;
        return data;
      });

      this.users = users;
      this.checkOnlineStatusChanges(users);
    });
  }


  updateOnlineStatus() {
    if (this.currentUser.id !== this.GuestUser.id) {
      const update = async () => {
        // this.currentUser = new User(this.localStorageS.loadObject('currentUser'));
        if (!this.currentUser.id) return;
        const userRef = doc(this.usersCollection, this.currentUser.id);
        try {
          await updateDoc(userRef, {
            online: Timestamp.now()
          });
          console.log('Online-Status aktualisiert:', this.currentUser.id);
        } catch (error) {
          console.error('Fehler beim Aktualisieren des Online-Status:', error);
        }
        setTimeout(update, 15000); // Nächste Aktualisierung in 15 Sekunden
      };
      update(); // Ersten Aufruf starten
    }
  }


  isUserOnline(lastOnline: Timestamp | undefined, thresholdSeconds = 20): boolean {
    if (!lastOnline) return false;
    const now = Timestamp.now().toMillis();
    const lastOnlineMillis = lastOnline.toMillis();
    return (now - lastOnlineMillis) < thresholdSeconds * 1000;
  }


  private checkOnlineStatusChanges(users: User[]) {
    const currentlyOnline = users.filter(user => this.isUserOnline(user.online));
    // Finde neu online gegangene Benutzer
    const newOnlineUsers = currentlyOnline.filter(user => {
      const wasOnline = this.previousOnlineStatus[user.id] || false;
      const isNowOnline = this.isUserOnline(user.online);
      this.previousOnlineStatus[user.id] = isNowOnline;
      return isNowOnline && !wasOnline && user.id !== this.currentUser.id;
    });
    if (newOnlineUsers.length > 0) {
      this.showOnlineNotification(newOnlineUsers[0]);
    }
    this.onlineUsers.next(currentlyOnline);
  }


  showOnlineNotification(user: User) {
    console.log(user, 'Is now Online');

    if (this.onUserOnlineCallback) {
      this.onUserOnlineCallback(user);
    }
  }


  private onUserOnlineCallback: ((user: User) => void) | null = null;
  setOnlinePopupCallback(callback: (user: User) => void) {
    this.onUserOnlineCallback = callback;
  }


  async waitUntilUsersLoaded(): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        if (this.users.length > 0) {
          resolve();
        } else {
          setTimeout(check, 100); // prüfe erneut in 100ms
        }
      };
      check();
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


  async getUserByEmailRealtime(email: string): Promise<User | undefined> {
    const q = query(this.usersCollection, where('email', '==', email));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const data = docSnap.data() as User;
      data.id = docSnap.id;
      return data;
    }
    return undefined;
  }
}