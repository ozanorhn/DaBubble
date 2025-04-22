import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getDataConnect, provideDataConnect } from '@angular/fire/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';

import { environment } from '../environments/environment'; 

const firebaseApp = initializeApp({
  projectId: "dabubblex-e42dc",
  appId: "1:415176988511:web:6a0f0f21fbd36d08e6c8ea",
  storageBucket: "dabubblex-e42dc.firebasestorage.app",
  apiKey: "AIzaSyAptwTA6O90AkGiKZ8cKZXcEmyPknynjpg",
  authDomain: "dabubblex-e42dc.firebaseapp.com",
  messagingSenderId: "415176988511",
  measurementId: "G-F8X1WVLC5M"
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => firebaseApp),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
 /*    provideAppCheck(() => {
      const provider = new ReCaptchaEnterpriseProvider('debug');
      return initializeAppCheck(firebaseApp, { provider, isTokenAutoRefreshEnabled: true });
    }), */
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideDataConnect(() => getDataConnect(connectorConfig)),
    provideFirebaseApp(() => initializeApp(environment.firebase)), // 🔥 Nutzt `environment.ts`
    provideTanStackQuery(new QueryClient()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance())
  ]
};
