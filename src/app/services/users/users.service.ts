import { Injectable } from '@angular/core';
import { timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }


  users = [
    {
      id: '',
      name: 'Frederik Beck',
      email: 'frederick@mail.com',
      avatar: '/assets/imgs/avatar1.svg',
      online: true
    },
    {
      id: '',
      name: 'Sofia Müller',
      email: 'sofia@mail.com',
      avatar: '/assets/imgs/avatar2.svg',
      online: true
    },
    {
      id: '',
      name: 'Noah Braun',
      email: 'noah@mail.com',
      avatar: '/assets/imgs/avatar3.svg',
      online: false
    },
    {
      id: '',
      name: 'Elise Roth',
      email: 'eliese@mail.com',
      avatar: '/assets/imgs/avatar4.svg',
      online: true
    },
    {
      id: '',
      name: 'Elias Neumann',
      email: 'elias@mail.com',
      avatar: '/assets/imgs/avatar5.svg',
      online: false
    },
    {
      id: '',
      name: 'Steffen Hoffmann',
      email: 'steffen@mail.com',
      avatar: '/assets/imgs/avatar6.svg',
      online: false
    }
  ]

}
