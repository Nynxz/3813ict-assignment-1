import { Injectable, OnInit, signal, Signal } from '@angular/core';
import { PreferencesService } from './preferences.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
type LoginResponse = {
  jwt: string;
};
type LoginJWT = {
  username: string;
  roles: string[];
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private preferencesService: PreferencesService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    console.log('ON INIT USER');
    this.auto_login();
  }

  // responsible for handling, logging in the user,
  // storing the current logged in user,
  // getting the JWT from the preferences service and trying to auto login etc

  name = signal('');

  auto_login() {
    let _jwt = this.preferencesService.getItem('jwt');
    if (_jwt) {
      try {
        this.name.set((jwtDecode(_jwt) as LoginJWT).username);
        this.router.navigateByUrl('/user');
      } catch (error) {
        console.log(error);
      }
    }
  }

  login(email: string, password: string) {
    this._backendLogin(email, password).subscribe((e) => {
      this.preferencesService.setItem('jwt', e.jwt);
      console.log(e.jwt);
      this.auto_login();
    });
    // this.name.set(_name);
  }

  _backendLogin(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(
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
    this.name.set('');
    this.preferencesService.setItem('name', '');
    this.preferencesService.setItem('jwt', '');
    this.router.navigateByUrl('/login');
  }
}
