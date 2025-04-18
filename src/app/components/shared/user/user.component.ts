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


  @Input() userInfo!: User; 
  




}
