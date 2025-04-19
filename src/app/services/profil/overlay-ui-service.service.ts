import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayUiService{

  constructor() { }

  private _showProfileOverlay = signal(false);

  readonly showProfileOverlay = this._showProfileOverlay.asReadonly();

  openProfile() {
    this._showProfileOverlay.set(true);
  }

  closeProfile() {
    this._showProfileOverlay.set(false);
  }

  toggleProfile() {
    this._showProfileOverlay.update(val => !val);
  }
}
