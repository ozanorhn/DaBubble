import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, User as FirebaseUser } from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
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
      // Google-Popup für Anmeldung
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      // Überprüfen, ob der Benutzer bereits in Firestore existiert
      const existingUser = this.userService.users.find((u) => u.email === user.email);

      if (existingUser) {
        console.log('Benutzer gefunden:', existingUser.email);

        const userDocRef = doc(this.userService.usersCollection, existingUser.id);
        await updateDoc(userDocRef, { online: true });
        console.log('Google Anmeldung erfolgreich:', user.email);

      } else {
        // Der Benutzer ist nicht registriert
        console.error('Der Benutzer ist nicht in der Datenbank registriert!');
        throw new Error('Der Benutzer ist nicht registriert. Bitte registrieren Sie sich zuerst.');
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
      user.online = true;
      user.createdAt = Date.now();

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


  // saveUserLocal() {
  //   this.saveObject('currentUser', this.userService.getTempUser());
  // }

  // /* saveUserLocal(user: User){
  // localStorage.setItem('currentUser, JSON.stringify(user))}; */


  checkLoggedInUser() {
    let obj = this.localStorageService.loadObject('currentUser');
    if (obj !== null && obj) {
      this.userService.tempUser = obj;
      console.log('Lokal User: ', obj);
    }
    console.log('Lokal User außerhalb: ', obj);
    
  }

  


  
}
