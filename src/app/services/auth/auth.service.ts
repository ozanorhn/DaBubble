import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = 'Frederik Beck';

  constructor() { }
}
