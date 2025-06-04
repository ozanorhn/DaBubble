import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, applyActionCode } from '@angular/fire/auth';

@Component({
  selector: 'app-confirm-email',
  template: `
  @if (message) {
    <p>{{ message }}</p>
  }
`
})
export class ConfirmEmailComponent implements OnInit {
  message: string = '';

  constructor(private route: ActivatedRoute, private auth: Auth, private router: Router) {}

  ngOnInit() {
    const mode = this.route.snapshot.queryParamMap.get('mode');
    const oobCode = this.route.snapshot.queryParamMap.get('oobCode');

    if (mode === 'verifyEmail' && oobCode) {
      applyActionCode(this.auth, oobCode)
        .then(() => {
          this.message = 'E-Mail erfolgreich bestätigt!';
          // Optional: automatische Weiterleitung
          setTimeout(() => this.router.navigate(['/login']), 3000);
        })
        .catch(() => {
          this.message = 'Bestätigungslink ist ungültig oder abgelaufen.';
        });
    } else {
      this.message = 'Ungültiger Bestätigungslink.';
    }
  }
}
