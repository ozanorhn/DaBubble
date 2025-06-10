import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  landing = signal<string>('login');
}
