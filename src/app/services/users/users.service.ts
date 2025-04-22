import { Injectable } from '@angular/core';
import { timestamp } from 'rxjs';

import { User } from '../../classes/user.class';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { console.log('User Array', this.users); }

  users = [
    new User({
      id: '',
      name: 'Frederik Beck',
      email: 'frederick@mail.com',
      avatar: '/assets/imgs/avatar1.svg',
      online: true
    }),
    new User({
      id: '',
      name: 'Sofia Müller',
      email: 'sofia@mail.com',
      avatar: '/assets/imgs/avatar2.svg',
      online: true
    }),
    new User({
      id: '',
      name: 'Noah Braun',
      email: 'noah@mail.com',
      avatar: '/assets/imgs/avatar3.svg',
      online: false
    }),
    new User({
      id: '',
      name: 'Elise Roth',
      email: 'eliese@mail.com',
      avatar: '/assets/imgs/avatar4.svg',
      online: true
    }),
    new User({
      id: '',
      name: 'Elias Neumann',
      email: 'elias@mail.com',
      avatar: '/assets/imgs/avatar5.svg',
      online: false
    }),
    new User({
      id: '',
      name: 'Steffen Hoffmann',
      email: 'steffen@mail.com',
      avatar: '/assets/imgs/avatar6.svg',
      online: false
    })
  ]





}
