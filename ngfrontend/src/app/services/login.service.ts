import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { PreferencesService } from '../storage/preferences.service';
import {
  BehaviorSubject,
  catchError,
  Observable,
  startWith,
  Subject,
  throwError,
} from 'rxjs';
import { HelloworldService } from '../test/helloworld.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private httpClient: HttpClient,
    private preferencesService: PreferencesService,
    private userService: UserService
  ) {}

  login(email: string, password: string) {
    return this.httpClient
      .post(
        'http://localhost:3010/login',
        JSON.stringify({ email, password }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(
            () => new Error('Something bad happened; please try again later.')
          );
        })
      );
  }

  logout() {
    this.userService.setIsLoggedInBoolean(false);
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
  }

  getDetails() {
    const jwt = this.preferencesService.getItem('jwt');
    const decodedJWT = this.decodeJWT(jwt!) as {
      username: string;
      roles: number[];
    };
    console.log(decodedJWT);
    return decodedJWT;
  }
}
