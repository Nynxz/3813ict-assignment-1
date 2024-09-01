import {
  Injectable,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { PreferencesService } from '@services/preferences/preferences.service';
import { GroupService } from '@services/group/group.service';
import { environment } from '../../../environments/environment';
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
    private router: Router,
    private groupService: GroupService
  ) {
    console.log('ON INIT USER');
    this.auto_login();
  }

  // responsible for handling, logging in the user,
  // storing the current logged in user,
  // getting the JWT from the preferences service and trying to auto login etc

  name = signal('');
  user: WritableSignal<any | undefined> = signal(undefined);

  auto_login() {
    let _jwt = this.preferencesService.getItem('jwt');
    if (_jwt) {
      try {
        this.name.set((jwtDecode(_jwt) as LoginJWT).username);
        this.user.set(jwtDecode(_jwt) as LoginJWT);
        this.groupService.updateServers();
        // this.router.navigateByUrl('/user');
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
      this.router.navigateByUrl('/user');
    });
    // this.name.set(_name);
  }

  _backendLogin(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(
        environment.backend_base_URL + '/user/login',
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
    this.groupService.groups.set([]);
  }
}
