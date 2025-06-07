import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /**
     * Speichert ein Objekt im localStorage
     * @param key Schlüssel für den Storage
     * @param value Das zu speichernde Objekt
     */
  saveObject<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      throw new Error('Speichern fehlgeschlagen');
    }
  }

  /**
   * Lädt ein Objekt aus dem localStorage
   * @param key Schlüssel für den Storage
   * @returns Das gespeicherte Objekt oder null wenn nicht vorhanden
   */
  loadObject<T>(key: string): T | null {
    try {
      const serialized = localStorage.getItem(key);
      return serialized ? JSON.parse(serialized) as T : null;
    } catch (error) {
      return null;
    }
  }


  /**
   * Löscht einen Eintrag aus dem localStorage
   * @param key Schlüssel für den Storage
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  }


  /**
   * Löscht alle Einträge des aktuellen Domains
   */
  clear(): void {
    localStorage.clear();
  }
}