import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  User as FirebaseUser
} from '@angular/fire/auth';
import { addDoc, doc, Timestamp, updateDoc } from '@angular/fire/firestore';
import { FirebaseError } from 'firebase/app';
import { UsersService } from '../users/users.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { User } from '../../classes/user.class';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  logedIn = false;

  constructor(
    public userService: UsersService,
    private readonly localStorageService: LocalStorageService
    // private router: Router
  ) { }


  getCurrentUser() {
    let currentUser = new User(this.localStorageService.loadObject('currentUser'))
    if (currentUser.id) {
      console.log('Eingeloggt als: ', currentUser);
      this.userService.currentUser = currentUser;
      // this.router.navigate(['/main']);
    }
  }


  async login(email: string, password: string): Promise<FirebaseUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      /*   if (!user.emailVerified) {
  
          const error: any = new Error('E-Mail nicht verifiziert. Bitte überprüfe dein Postfach.');
          error.code = 'auth/email-not-verified';
          throw error;
  
        } */

      console.log('Login erfolgreich:', user.email);
      this.logedIn = true;
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  async registerUser() {
    const email = this.userService.tempUser.email ?? '';
    const password = this.userService.tempUser.password ?? '';
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const firebaseUser = userCredential.user;

      await sendEmailVerification(firebaseUser);

      const user = new User(this.userService.tempUser);
      user.email = firebaseUser.email || '';
      user.avatar = user.avatar || '/assets/imgs/avatar1.svg';
      const now = Timestamp.now();
      user.online = now;
      user.createdAt = now;
      const { password: _, ...userProfile } = user.toJSON();
      await addDoc(this.userService.usersCollection, userProfile);
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
      throw error;
    }
  }

  async googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      if (!user.email) throw new Error('Fehlende E-Mail-Adresse vom Google-Konto.');

      const existingUser = await this.userService.getUserByEmailRealtime(user.email);
      if (existingUser) {
        const userDocRef = doc(this.userService.usersCollection, existingUser.id);
        await updateDoc(userDocRef, { online: Timestamp.now() });
        this.localStorageService.saveObject('currentUser', existingUser);
        this.logedIn = true;
      } else {
        await this.createNewUserByGoogleLogin(user);
      }
    } catch (error) {
      console.error('Fehler bei der Google-Anmeldung:', error);
      throw error;
    }
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
    this.localStorageService.saveObject('currentUser', newUser);
  }

  checkLoggedInUser() {
    const obj = this.localStorageService.loadObject('currentUser');
    if (obj) {
      this.userService.tempUser = obj;
      console.log('Lokal User: ', obj);
    }
  }
}
