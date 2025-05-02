import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = 'Frederik Beck';
  private auth = inject(Auth);
 

  constructor(
    public userService: UsersService
  ) { 
    
  }





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

}
