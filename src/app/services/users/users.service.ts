import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { User } from '../../classes/user.class';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, onSnapshot, updateDoc } from '@firebase/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User as FirebaseUser } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {
  // private auth = inject(Auth);

  private firestore = inject(Firestore);
  private auth = inject(Auth);


  usersCollection = collection(this.firestore, 'users');
  unsubscribe: () => void;
  users: User[] = [];
  tempUser: Partial<User> = {};

  constructor() {
    this.unsubscribe = onSnapshot(this.usersCollection, (snapshot) => {
      this.users = snapshot.docs.map((doc) => {
        const data = doc.data() as User;
        data.id = doc.id;
        return data;
      });
    });

    this.checkLoggedInUser();
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


  async registerUser() {
    // 1. Daten aus tempUser holen
    const email = this.tempUser.email ?? '';
    const password = this.tempUser.password ?? '';
    try {
      // 2. Firebase Auth: Benutzer registrieren
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const firebaseUser = userCredential.user;

      // 3. Neues User-Objekt erstellen
      const user = new User(this.tempUser);

      // 4. Fehlende Felder sicher ergänzen
      user.email = firebaseUser.email || '';
      user.avatar = user.avatar || '/assets/imgs/avatar1.svg';
      user.online = true;
      user.createdAt = Date.now();

      // 5. Passwort entfernen vor dem Speichern
      const { password: _, ...userProfile } = user.toJSON();

      // 6. Userprofil in Firestore speichern
      await addDoc(this.usersCollection, userProfile);

      console.log('Registrierung erfolgreich:', userProfile);

    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
      throw error;
    }
  }


  // 🔓 Login mit E-Mail & Passwort
  async login(email: string, password: string): Promise<FirebaseUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Login erfolgreich:', userCredential.user.email);
      return userCredential.user;
    } catch (error: unknown) {
      console.error('Login fehlgeschlagen:', error);
      throw error;
    }
  }


  setTempUser(data: Partial<User>) {
    this.tempUser = { ...this.tempUser, ...data };
    console.log('TempUser gesetzt:', this.tempUser);  // Überprüfe, ob der Avatar korrekt gesetzt wird
  }


  getTempUser() {
    //console.log('Current User ???', this.tempUser);
    return this.tempUser;
  }


  // async googleLogin() {
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     // Google-Popup für Anmeldung
  //     const result = await signInWithPopup(this.auth, provider);
  //     const user = result.user;
  //     // Überprüfen, ob der Benutzer bereits in Firestore existiert
  //     const existingUser = this.users.find((u) => u.email === user.email);

  //     if (existingUser) {
  //       console.log('Benutzer gefunden:', existingUser.email);

  //       const userDocRef = doc(this.usersCollection, existingUser.id);
  //       await updateDoc(userDocRef, { online: true });
  //       console.log('Google Anmeldung erfolgreich:', user.email);

  //     } else {
  //       // Der Benutzer ist nicht registriert
  //       console.error('Der Benutzer ist nicht in der Datenbank registriert!');
  //       throw new Error('Der Benutzer ist nicht registriert. Bitte registrieren Sie sich zuerst.');
  //     }
  //   } catch (error) {
  //     console.error('Fehler bei der Google-Anmeldung:', error);
  //     throw error;
  //   }
  // }


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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getUserById2(id: string) {
    return this.users.find((user) => id === user.id)?.name;
  }

  
  GuestUser = {
    id: 'pEGZHQAC1HQNQQYnKNE1J04pbXM2',
    name: 'Guest',
    email: 'gast@test.de',
    avatar: '/assets/imgs/avatar9.jpg',
    online: true,
  }


  saveUserLocal() {
    this.saveObject('currentUser', this.GuestUser);
  }


  checkLoggedInUser() {
    let obj = this.loadObject('currentUser');
    if (obj) {
      this.tempUser = obj;
    }
  }


  /**
     * Speichert ein Objekt im localStorage
     * @param key Schlüssel für den Storage
     * @param value Das zu speichernde Objekt
     */
  saveObject<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Fehler beim Speichern im localStorage:', error);
      throw new Error('Speichern fehlgeschlagen');
    }
  }

  /**
   * Lädt ein Objekt aus dem localStorage
   * @param key Schlüssel für den Storage
   * @returns Das gespeicherte Objekt oder null wenn nicht vorhanden
   */
  loadObject<T>(key: string): T | null {
    try {
      const serialized = localStorage.getItem(key);
      return serialized ? JSON.parse(serialized) as T : null;
    } catch (error) {
      console.error('Fehler beim Laden aus localStorage:', error);
      return null;
    }
  }


  /**
   * Löscht einen Eintrag aus dem localStorage
   * @param key Schlüssel für den Storage
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  }


  /**
   * Löscht alle Einträge des aktuellen Domains
   */
  clear(): void {
    localStorage.clear();
  }
}
