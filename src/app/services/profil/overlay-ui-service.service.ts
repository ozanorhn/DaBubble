import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayUiService{
showEditOverlay(): any {
throw new Error('Method not implemented.');
}

  constructor() { }

  private _showProfileOverlay = signal(false);
  readonly showProfileOverlay = this._showProfileOverlay.asReadonly();

  private _showEditProfileOverlay = signal(false);
  readonly showEditProfileOverlay = this._showEditProfileOverlay.asReadonly();

  openProfile() {
    this._showProfileOverlay.update(() => true);
  }

  closeProfile() {
    this._showProfileOverlay.update(() => false);
  }

  toggleProfile() {
    this._showProfileOverlay.update(val => !val);
  }

  openEditProfile() {
    this._showEditProfileOverlay.update(() => true);
  }

  closeEditProfile() {
    this._showEditProfileOverlay.update(() => false);
  }

  toggleEditProfile() {
    this._showEditProfileOverlay.update(val => !val);
  }
}
