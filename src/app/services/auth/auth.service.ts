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
import { UsersService } from '../users/users.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { User } from '../../classes/user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  isLoggedIn = false;


  constructor(
    public userService: UsersService,
    private readonly localStorageService: LocalStorageService
  ) { }


  /**
   * Loads the current user from localStorage and sets it in UserService.
   * Only applies if the user has a valid ID.
   */
  loadCurrentUserFromStorage() {
    let currentUser = new User(this.localStorageService.loadObject('currentUser'))
    if (currentUser.id) {
      console.log('Eingeloggt als: ', currentUser);
      this.userService.currentUser = currentUser;
    }
  }


  async login(email: string, password: string): Promise<FirebaseUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      // this.verifyEmailOrThrow(user)
      console.log('Login erfolgreich:', user.email);
      this.isLoggedIn = true;
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  
  verifyEmailOrThrow(user:FirebaseUser) {
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
    await sendEmailVerification(firebaseUser);
    const user = new User(this.userService.tempUser);
    user.email = firebaseUser.email || '';
    user.avatar = user.avatar || '/assets/imgs/avatar1.svg';
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
    this.isLoggedIn = true;
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
    const storedUserData = this.localStorageService.loadObject('currentUser');
    if (storedUserData) {
      this.userService.tempUser = storedUserData;
      console.log('Lokal User: ', storedUserData);
    }
  }
}