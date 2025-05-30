import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, User as FirebaseUser } from '@angular/fire/auth';
import { addDoc, doc, Timestamp, updateDoc } from '@angular/fire/firestore';
import { UsersService } from '../users/users.service';
import { User } from '../../classes/user.class';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private auth = inject(Auth);


  constructor(
    private readonly userService: UsersService,
    private readonly localStorageService: LocalStorageService,
  ) { }


  async googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      if (!user.email) {
        throw new Error('Fehlende E-Mail-Adresse vom Google-Konto.');
      }
      const existingUser = await this.userService.getUserByEmailRealtime(user.email);
      if (existingUser) {
        console.log('Benutzer gefunden:', existingUser.email);
        const userDocRef = doc(this.userService.usersCollection, existingUser.id);
        await updateDoc(userDocRef, { online: Timestamp.now() });
        this.localStorageService.saveObject('currentUser', existingUser);

      } else {
        await this.createNewUserByGoogleLogin(user);
      }

    } catch (error) {
      console.error('Fehler bei der Google-Anmeldung:', error);
      throw error;
    }
  }




  async registerUser() {
    const email = this.userService.tempUser.email ?? '';
    const password = this.userService.tempUser.password ?? '';
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const firebaseUser = userCredential.user;
      const user = new User(this.userService.tempUser);
      user.email = firebaseUser.email || '';
      user.avatar = user.avatar || '/assets/imgs/avatar1.svg';
      const now = Timestamp.now();
      user.online = now;
      user.createdAt = now;
      const { password: _, ...userProfile } = user.toJSON();
      await addDoc(this.userService.usersCollection, userProfile);
      console.log('Registrierung erfolgreich:', userProfile);
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
      throw error;
    }
  }


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
