import { Injectable, OnInit, signal, Signal } from '@angular/core';
import { PreferencesService } from './preferences.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private preferencesService: PreferencesService) {
    console.log('ON INIT USER');
    this.auto_login();
  }

  // responsible for handling, logging in the user,
  // storing the current logged in user,
  // getting the JWT from the preferences service and trying to auto login etc

  name = signal('');

  auto_login() {
    let _name = this.preferencesService.getItem('name');
    if (_name) {
      this.name.set(_name);
    }
    console.log(_name);
  }

  login(_name: string) {
    this.name.set(_name);
    this.preferencesService.setItem('name', '_name');
  }

  logout() {
    this.name.set('');
    this.preferencesService.setItem('name', '');
  }
}
