import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { PreferencesService } from '@services/preferences/preferences.service';
import { GroupService } from '@services/group/group.service';
import { environment } from '@environments/environment';
import { User } from '@/user.type';

type LoginResponse = {
  jwt: string;
};
type LoginJWT = {
  _id: string;
  username: string;
  roles: number[];
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private preferenceService: PreferencesService,
    private httpClient: HttpClient,
    private router: Router,
    private groupService: GroupService
  ) {
    this.auto_login();
  }

  // responsible for handling, logging in the user,
  // storing the current logged in user,
  // getting the JWT from the preferences service and trying to auto login etc

  user: WritableSignal<User | undefined> = signal(undefined);

  auto_login() {
    let _jwt = this.preferenceService.preferences().jwt;
    if (_jwt != '') {
      try {
        this.user.set(jwtDecode(_jwt) as LoginJWT);
        this.groupService.refreshGroups();
        console.log('AUTOLOGIN: SUCCESS');
        // this.router.navigateByUrl('/user');
      } catch (error) {
        console.log(error);
        console.log('AUTOLOGIN: FAILURE');
      }
    }
  }

  login(username: string, password: string) {
    return new Promise((res) => {
      this.http_postUserLogin(username, password).subscribe({
        next: (e) => {
          res({ success: true });
          this.preferenceService.setItem('jwt', e.jwt);
          this.auto_login();
          this.router.navigateByUrl('/user');
        },
        error: (f) => {
          res({ error: f.error.error });
        },
      });
    });
  }

  register(email: string, password: string, username: string) {
    return new Promise((res) => {
      this.http_postUserCreate(email, password, username).subscribe({
        next: (e) => {
          res({ success: true });
          this.preferenceService.setItem('jwt', e.jwt);
          this.auto_login();
          this.router.navigateByUrl('/user');
        },
        error: (f) => {
          res({ error: f.error.error });
        },
      });
    });
  }

  logout() {
    this.user.set(undefined);
    this.preferenceService.setItem('jwt', '');
    this.router.navigateByUrl('/login');
    this.groupService.refreshGroups();
  }

  /*  HTTP  */

  // POST /user/create
  http_postUserCreate(email: string, password: string, username: string) {
    return this.httpClient.post<LoginResponse>(
      environment.backend_base_URL + '/user/create',
      JSON.stringify({ user: { email, password, username } }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // POST /user/login
  http_postUserLogin(username: string, password: string) {
    return this.httpClient.post<LoginResponse>(
      environment.backend_base_URL + '/user/login',
      JSON.stringify({ user: { username, password } }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // GET /users/all
  //TODO: Move to admin service or something?
  http_getAllUsers() {
    return this.httpClient.get(environment.backend_base_URL + '/users/all', {
      headers: {
        Authorization: 'Bearer ' + this.preferenceService.preferences().jwt,
        'Content-Type': 'application/json',
      },
    });
  }
}
