import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { User } from '../../classes/user.class';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, onSnapshot } from '@firebase/firestore';
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
    // console.log('UsersService gestartet');

    // Firestore Snapshot Listener
    this.unsubscribe = onSnapshot(this.usersCollection, (snapshot) => {
      this.users = snapshot.docs.map((doc) => {
        const data = doc.data() as User;
        data.id = doc.id;
        return data;
      });
      // console.log('Aktuelle Users:', this.users);
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  async addUser() {

    // const user = new User()

    const user = {
      id: '',
      name: this.tempUser.name ?? '',
      email: this.tempUser.email ?? '',
      password: this.tempUser.password ?? '',
      avatar: `/assets/imgs/avatar${this.tempUser.avatar ?? 1}.svg`,
      online: true,
      //createdAt: new Date().toISOString()
      createdAt: Date.now()
    };

    try {
      const docRef = await addDoc(this.usersCollection, user);
      console.log('User erstellt mit ID:', docRef.id);
    } catch (error) {
      console.error('Fehler beim Erstellen des Users:', error);
    }
  }

  // 🔐 Registrierung (Auth + Firestore-Profil)
  async registerUser() {
    // Hole die E-Mail, das Passwort, den Namen und den Avatar aus tempUser.
    // Falls keine Werte vorhanden sind, werden Standardwerte verwendet.
    const email = this.tempUser.email ?? '';
    const password = this.tempUser.password ?? '';
    const name = this.tempUser.name ?? '';
    const avatarPath = this.tempUser.avatar ?? '/assets/imgs/avatar1.svg';

    try {
      // Schritt 1: Erstelle einen neuen Benutzer bei Firebase Authentication
      // mit der E-Mail und dem Passwort.
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      // Nach erfolgreicher Anmeldung enthält userCredential das Firebase-User-Objekt.
      const firebaseUser = userCredential.user;

      // Schritt 2: Erstelle ein Nutzerprofil für Firestore, ohne das Passwort zu speichern.
      const userProfile: Partial<User> = {
        name,
        email,
        avatar: avatarPath,
        online: true,     // Der Nutzer ist online (Status)
        //createdAt: new Date().toISOString() // Zeitstempel der Registrierung
        createdAt: Date.now()
      };

      // Schritt 3: Speichere das Nutzerprofil in der Firestore-Collection 'users'.
      await addDoc(this.usersCollection, userProfile);
      console.log('Registrierung erfolgreich:', userProfile); // Erfolgsmeldung in der Konsole
    } catch (error) {
      // Falls ein Fehler auftritt (z.B. E-Mail bereits registriert), wird dieser abgefangen.
      console.error('Fehler bei der Registrierung:', error);
      throw error; // Fehler wird nach oben weitergereicht, damit er z.B. im UI verarbeitet werden kann.
    }
  }


  // 🔓 Login mit E-Mail & Passwort
  async login(email: string, password: string): Promise<FirebaseUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Login erfolgreich:', userCredential.user.email);
      return userCredential.user;
    } catch (error) {
      console.error('Login fehlgeschlagen:', error);
      throw error;
    }
  }

  setTempUser(data: Partial<User>) {
    this.tempUser = { ...this.tempUser, ...data };
    console.log('TempUser gesetzt:', this.tempUser);  // Überprüfe, ob der Avatar korrekt gesetzt wird
  }

  getTempUser() {
    return this.tempUser;
  }


  // Google-Anmeldung
  async googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      console.log('Google Anmeldung erfolgreich:', user.email);

      // Userprofil in Firestore speichern, ohne das Passwort
      const userProfile: Partial<User> = {
        name: user.displayName || '',
        email: user.email || '',
        avatar: user.photoURL || '/assets/imgs/avatar1.svg', // Standard-Avatar
        online: true,
        //createdAt: new Date().toISOString()
        createdAt: Date.now()
      };

      await addDoc(this.usersCollection, userProfile);
      console.log('User in Firestore gespeichert:', userProfile);
    } catch (error) {
      console.error('Fehler bei der Google-Anmeldung:', error);
      throw error;
    }
  }

  //E-Mail den User aus Firestore zurückgibt
  getUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }



// getUserById2(id: string) {
//   const user = this.users.find(u => u.id === id);
//   return user?.name;
// }



getUserById2(id: string) {

  console.log('Filter id bey Name ',this.users.find((user) => id === user.id)?.name );
  console.log('Users Array ',this.users);
  
  
  return this.users.find((user) => id === user.id)?.name;
}


// getUserById(id: string) {
//   this.users.filter((user) => {
//     if (id == user.id) {
//       return user.name
//     }
//   });
// }



}
