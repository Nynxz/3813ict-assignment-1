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
    private preferencesService: PreferencesService,
    private httpClient: HttpClient,
    private router: Router,
    private groupService: GroupService
  ) {
    console.log('ON INIT USER');
    this.auto_login();
  }

  // responsible for handling, logging in the user,
  // storing the current logged in user,
  // getting the JWT from the preferences service and trying to auto login etc

  user: WritableSignal<User | undefined> = signal(undefined);

  auto_login() {
    let _jwt = this.preferencesService.getItem('jwt');
    if (_jwt) {
      try {
        this.user.set(jwtDecode(_jwt) as LoginJWT);
        this.groupService.updateServers();
        // this.router.navigateByUrl('/user');
      } catch (error) {
        console.log(error);
      }
    }
  }

  login(username: string, password: string) {
    return new Promise((res) => {
      this._backendLogin(username, password).subscribe({
        next: (e) => {
          res({ success: true });
          this.preferencesService.setItem('jwt', e.jwt);
          console.log(e);
          this.auto_login();
          this.router.navigateByUrl('/user');
        },
        error: (f) => {
          res({ error: f.error.error });
          console.error(f.error.error);
        },
      });
    }); // this.name.set(_name);
  }

  register(email: string, password: string, username: string) {
    return new Promise((res) => {
      this.httpClient
        .post<LoginResponse>(
          environment.backend_base_URL + '/user/create',
          JSON.stringify({ user: { email, password, username } }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .subscribe({
          next: (e) => {
            res({ success: true });
            this.preferencesService.setItem('jwt', e.jwt);
            console.log(e);
            this.auto_login();
            this.router.navigateByUrl('/user');
          },
          error: (f) => {
            res({ error: f.error.error });
            console.error(f.error.error);
          },
        });
    }); // this.name.set(_name);
  }

  _backendLogin(username: string, password: string) {
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

  logout() {
    this.user.set(undefined);
    this.preferencesService.setItem('jwt', '');
    this.router.navigateByUrl('/login');
    this.groupService.groups.set([]);
  }

  getAllUsers() {
    return this.httpClient.post(
      environment.backend_base_URL + '/users/all',
      JSON.stringify({ jwt: this.preferencesService.getItem('jwt') }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
