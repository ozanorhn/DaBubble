import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayUiService } from '../../../../services/profil/overlay-ui-service.service';
import { UsersService } from '../../../../services/users/users.service';
import { User } from '../../../../classes/user.class';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profil',
  imports: [FormsModule],
  templateUrl: './edit-profil.component.html',
  styleUrl: './edit-profil.component.scss'
})
export class EditProfilComponent {
  avatarUrl: string = '';
  /* Name und Id */
  name: string = ''; 
  userId: string = ''; 


  constructor(private router: Router, public ui: OverlayUiService,   private userService: UsersService ) {}


  ngOnInit(): void {
    const user = this.userService.getTempUser();
    this.avatarUrl = user.avatar ?? '/assets/imgs/avatar1.svg'; //avatar
    this.name = user.name ?? ''; // <-- Name setzen
    this.userId = user.id ?? ''; // <-- ID setzen (damit wir wissen, welchen User wir updaten)
  }

  closeProfile() {
    this.router.navigate(['/channel']); // oder wohin du zurück möchtest
   
  }

  closeOverlay() {
    this.ui.closeEditProfile();
  }

  async saveProfile() {
    if (this.userId) {
      try {
        await this.userService.updateUser(this.userId, { name: this.name });
        console.log('Profil gespeichert');
        this.closeOverlay();
      } catch (error) {
        console.error('Fehler beim Speichern:', error);
      }
    }
  } 


   
}
