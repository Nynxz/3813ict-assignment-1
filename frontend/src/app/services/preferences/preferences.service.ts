import { Injectable, signal } from '@angular/core';

export type UserPreferences = {
  sidebarfolded: string;
  jwt: string;
};

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  preferences = signal({
    sidebarfolded: this.getItem('sidebarfolded')!,
    jwt: this.getItem('jwt')!,
  });

  setItem(key: string, value: string): string | null {
    console.log(`SET ${key}: ${value}`);
    localStorage.setItem(key, value);
    this.preferences.update((e: any) => {
      e[key as any] = value;
      return { ...e };
    });
    return value;
  }

  getItem(key: string): string | null {
    console.log(`GOT ${key}: ${localStorage.getItem(key)}`);
    return localStorage.getItem(key);
  }
}
