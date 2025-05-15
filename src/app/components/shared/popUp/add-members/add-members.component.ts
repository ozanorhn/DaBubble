import { Component, OnInit } from '@angular/core';
import { OverlayService } from '../../../../pageServices/overlays/overlay.service';
import { UsersService } from '../../../../services/users/users.service';
import { User } from '../../../../classes/user.class';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../../user/user.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-members',
  imports: [
    CommonModule,
    UserComponent,
    FormsModule
  ],
  templateUrl: './add-members.component.html',
  styleUrl: './add-members.component.scss'
})
export class AddMembersComponent implements OnInit {


  members: User[] = [];

  userSearch = '';

  constructor(
    public overlayService: OverlayService,
    public userService: UsersService
  ) {

  }

  ngOnInit(): void {
    this.members = this.userService.users
  }

  



}
