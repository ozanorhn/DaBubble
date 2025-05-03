import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideFirebaseApp(() => initializeApp({
    projectId: "da-bubble-ece8c",
    appId: "1:469101806259:web:ae05c97bbc2e92d22ee6c6",
    storageBucket: "da-bubble-ece8c.firebasestorage.app",
    apiKey: "AIzaSyBCy0-45KoJyIlUZQwZsdySUTAaWGaiqwU",
    authDomain: "da-bubble-ece8c.firebaseapp.com",
    messagingSenderId: "469101806259"
  })),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideDatabase(() => getDatabase())]
};

