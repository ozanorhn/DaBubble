import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, User as FirebaseUser } from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, Timestamp, updateDoc } from '@angular/fire/firestore';
import { UsersService } from '../users/users.service';
import { User } from '../../classes/user.class';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = 'Frederik Beck';
  private auth = inject(Auth);
 

  constructor(
    public userService: UsersService,
    public localStorageService: LocalStorageService
  ) { }


async googleLogin() {
      const provider = new GoogleAuthProvider();
    
      try {
        const result = await signInWithPopup(this.auth, provider);
        const user = result.user;
    
        if (!user.email) {
          throw new Error('Fehlende E-Mail-Adresse vom Google-Konto.');
        }
    
        // Firestore direkt abfragen, um sicherzugehen, dass der Benutzer existiert
        const existingUser = await this.userService.getUserByEmailRealtime(user.email);
    
        if (existingUser) {
          console.log('Benutzer gefunden:', existingUser.email);
          const userDocRef = doc(this.userService.usersCollection, existingUser.id);
          await updateDoc(userDocRef, { online: Timestamp.now() });
    
          // Auch in LocalStorage setzen, falls gewünscht
          this.localStorageService.saveObject('currentUser', existingUser);
    
        } else {
             // Neuer Google-Nutzer wird registriert
        await this.createNewUserByGoogleLogin(user);
        }
    
      } catch (error) {
        console.error('Fehler bei der Google-Anmeldung:', error);
        throw error;
      }
    }
    



  async registerUser() {
    // 1. Daten aus tempUser holen
    const email = this.userService.tempUser.email ?? '';
    const password = this.userService.tempUser.password ?? '';
    try {
      // 2. Firebase Auth: Benutzer registrieren
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const firebaseUser = userCredential.user;

      // 3. Neues User-Objekt erstellen
      const user = new User(this.userService.tempUser);

      // 4. Fehlende Felder sicher ergänzen
      user.email = firebaseUser.email || '';
      user.avatar = user.avatar || '/assets/imgs/avatar1.svg';
      user.online = Timestamp.now();
      user.createdAt =  Timestamp.now(); //Date.now();

      // 5. Passwort entfernen vor dem Speichern
      const { password: _, ...userProfile } = user.toJSON();

      // 6. Userprofil in Firestore speichern
      await addDoc(this.userService.usersCollection, userProfile);

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
      // this.userService.tempUser = userCredential.user
      return userCredential.user;
    } catch (error: unknown) {
      console.error('Login fehlgeschlagen:', error);
      throw error;
    }
    // this.saveUserLocal()
  }


  checkLoggedInUser() {
    let obj = this.localStorageService.loadObject('currentUser');
    if (obj !== null && obj) {
      this.userService.tempUser = obj;
      console.log('Lokal User: ', obj);
    }
    console.log('Lokal User außerhalb: ', obj);
    
  }

  async createNewUserByGoogleLogin(user: FirebaseUser) {
    const newUser = new User({
      name: user.displayName ?? 'Google Nutzer',
      email: user.email ?? '',
      avatar: user.photoURL ?? '/assets/imgs/avatar1.svg',
      online: Timestamp.now(),
      createdAt: Timestamp.now(),
    });

    const { password: _, ...userProfile } = newUser.toJSON();
    await addDoc(this.userService.usersCollection, userProfile);

    console.log(
      'Google Benutzer erfolgreich registriert und angemeldet:',
      user.email
    );

    this.localStorageService.saveObject('currentUser', newUser);
  }

  
}
