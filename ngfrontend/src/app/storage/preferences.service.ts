import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  constructor() {}

  setItem(key: string, value: string): string | null {
    console.log(`SET: ${key}-${value}`);
    localStorage.setItem(key, value);
    return value;
  }

  getItem(key: string): string | null {
    console.log(`GOT: ${localStorage.getItem(key)}`);
    return localStorage.getItem(key);
  }
}
