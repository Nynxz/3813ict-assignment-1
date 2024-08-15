import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { PreferencesService } from '../storage/preferences.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  details = {
    username: '',
  };

  username = new Subject();

  constructor(
    private httpClient: HttpClient,
    private preferencesService: PreferencesService
  ) {}

  login(email: string, password: string) {
    return this.httpClient.post(
      'http://localhost:3010/login',
      JSON.stringify({ email, password }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  logout() {
    this.username.next('');
    this.preferencesService.setItem('jwt', '');
  }

  decodeJWT(jwt: string) {
    try {
      return jwtDecode(jwt);
    } catch (error) {
      return { username: '' };
    }
  }

  setDetails(username: string) {
    console.log('Setting Details');
    this.details.username = username;
    this.username.next(this.details.username);
    console.log(this.details);
  }

  getDetails() {
    const jwt = this.preferencesService.getItem('jwt');
    const decodedJWT = this.decodeJWT(jwt!) as { username: string };
    this.details.username = decodedJWT.username;
    this.username.next(this.details.username);
    return this.details;
  }
}
