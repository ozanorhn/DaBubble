import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../../classes/user.class';

@Component({
  selector: 'app-user',
  imports: [
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {


  avatar = [
    { av1: '/assets/imgs/avatar1.svg' },
    { av2: '/assets/imgs/avatar2.svg' },
    { av3: '/assets/imgs/avatar3.svg' },
    { av4: '/assets/imgs/avatar4.svg' },
    { av5: '/assets/imgs/avatar5.svg' },
    { av6: '/assets/imgs/avatar6.svg' },
 
  ]


  @Input() userInfo!: User; 
  



//  @Input() userInfo = {
//     id: '',
//     name: 'Frederik Beck',
//     email: 'frederick@mail.com',
//     avatar: 'av1',
//     online: false
//   }

}
