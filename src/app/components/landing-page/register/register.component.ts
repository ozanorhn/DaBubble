import { Component } from '@angular/core';

import { LandingPageService } from '../../../pageNavServices/landing-page.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../models/user.class';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  user: User = new User();
  password: string = '';
  birtDate : Date = new Date();

  constructor(public landing: LandingPageService,   private firestore: Firestore ) {}

  goToLogin() {
    this.landing.landing.set('avatar');
  }

  async registerUser() {
    // Hier kannst du das User-Objekt weiterverwenden
 
    console.log('Current user is', this.user);
    console.log('Passwort:', this.password);
    this.goToLogin() ;

   /*  if (this.birtDate) {
      this.user.birthDate = this.birtDate.getTime();
    } */

    // Optional: zur nächsten Seite navigieren
    // this.landing.landing.set('dashboard');


  
    
    
      try {
        const usersCollection = collection(this.firestore, 'users'); // Firestore-Collection referenzieren
        await addDoc(usersCollection, this.user.toJSON()); // User speichern
        console.log('User erfolgreich in Firestore gespeichert!');
        
     
        window.location.reload(); // **Seite neu laden**
      } catch (error) {
        console.error('Fehler beim Speichern:', error);
      } finally {
   
      }
   
  }

}
