import { effect, inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  User as FirebaseUser,
  applyActionCode
} from '@angular/fire/auth';
import { addDoc, doc, Timestamp, updateDoc } from '@angular/fire/firestore';
import { UsersService } from '../users/users.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { User } from '../../classes/user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  isLoggedIn = signal(false);


  constructor(
    public userService: UsersService,
    private readonly localStorageService: LocalStorageService
  ) {
    effect(() => {
      const showChannel = this.isLoggedIn();
      if (this.isLoggedIn()) {
        userService.updateOnlineStatus();
      }
      // let id = setTimeout(() => {
      //   this.setReactionsAmount();
      //   clearTimeout(id);
      // }, 100);
    });
  }


  /**
   * Loads the current user from localStorage and sets it in UserService.
   * Only applies if the user has a valid ID.
   */
  loadCurrentUserFromStorage() {
    let currentUser = new User(this.localStorageService.loadObject('currentUser'))
    currentUser.online = new Timestamp(currentUser.online.seconds, currentUser.online.nanoseconds);
    if (currentUser.id) {
      this.userService.currentUser = currentUser;
    }
    this.isLoggedIn.set(true);
  }


  async login(email: string, password: string): Promise<FirebaseUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      // this.verifyEmailOrThrow(user)
      this.isLoggedIn.set(true);
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }


  verifyEmailOrThrow(user: FirebaseUser) {
    if (!user.emailVerified) {
      const error: any = new Error('E-Mail nicht verifiziert. Bitte überprüfe dein Postfach.');
      error.code = 'auth/email-not-verified';
      throw error;
    }
  }

  async completeUserRegistration() {
    const email = this.userService.tempUser.email ?? '';
    const password = this.userService.tempUser.password ?? '';
    try {
      await this.createFirebaseUserAndProfile(email, password)
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
      throw error;
    }
  }


  async createFirebaseUserAndProfile(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const firebaseUser = userCredential.user;
    // await sendEmailVerification(firebaseUser);
    const user = new User(this.userService.tempUser);
    user.email = firebaseUser.email || '';
    user.avatar = user.avatar || 'assets/imgs/avatar1.svg';
    const now = Timestamp.now();
    user.online = now;
    user.createdAt = now;
    const { password: _, ...userProfile } = user.toJSON();
    await addDoc(this.userService.usersCollection, userProfile);
  }


  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      if (!user.email) throw new Error('Fehlende E-Mail-Adresse vom Google-Konto.');
      const existingUser = await this.userService.getUserByEmailRealtime(user.email);
      if (existingUser) await this.loginWithGoogle(existingUser)
      else await this.createNewUserByGoogleLogin(user);
    } catch (error) {
      console.error('Fehler bei der Google-Anmeldung:', error);
      throw error;
    }
  }


  async loginWithGoogle(existingUser: User) {
    const userDocRef = doc(this.userService.usersCollection, existingUser.id);
    await updateDoc(userDocRef, { online: Timestamp.now() });
    this.localStorageService.saveObject('currentUser', existingUser);
    this.isLoggedIn.set(true);
  }


  async createNewUserByGoogleLogin(user: FirebaseUser) {
    const newUser = new User({
      name: user.displayName ?? 'Google Nutzer',
      email: user.email ?? '',
      avatar: user.photoURL ?? 'assets/imgs/avatar1.svg',
      online: Timestamp.now(),
      createdAt: Timestamp.now(),
    });

    const { password: _, ...userProfile } = newUser.toJSON();
    await addDoc(this.userService.usersCollection, userProfile);
    this.localStorageService.saveObject('currentUser', newUser);
  }


  checkLoggedInUser() {
    let storedUserData = this.localStorageService.loadObject('currentUser') as User;
    storedUserData.online = Timestamp.now();
    if (storedUserData) {
      this.userService.tempUser = storedUserData;
    }
  }
}