import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  landing = signal<string>('login')

  constructor() { 
    console.log(this.landing());
    
  }
}
