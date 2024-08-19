import { Injectable } from '@angular/core';
import { PreferencesService } from '../storage/preferences.service';
import { JwtService } from './jwt.service';
import { BehaviorSubject, Observable } from 'rxjs';

type UserInfo = {
  isLoggedIn: boolean;
  username: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn = new BehaviorSubject(false);
  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
  setIsLoggedInBoolean(value: boolean): void {
    this.isLoggedIn.next(value);
  }

  userInfo = new BehaviorSubject<UserInfo>({ isLoggedIn: false, username: '' });
  get userInfo$(): Observable<UserInfo> {
    return this.userInfo.asObservable();
  }
  setUserInfo(value: UserInfo): void {
    this.userInfo.next(value);
  }

  jwt: string | null = null;

  constructor(
    private storage: PreferencesService,
    private jwtService: JwtService
  ) {
    this._autoLogin();
  }

  login(){
    
  }

  _autoLogin() {
    console.log('Trying auto login from JWT');
    // Check if JWT Exists
    const jwt = this.jwtService.getJWT();
    console.log(jwt);
    if (jwt != null) {
      // JWT is saved
      console.log('Auto login success');
      this.setIsLoggedInBoolean(true);
      this.setUserInfo({ isLoggedIn: true, username: jwt.username });
      return;
    }
    this.setUserInfo({ isLoggedIn: false, username: '' });
    console.log('Auto login failure');
    console.log('LOGGED IN: ', this.isLoggedIn);
  }

  // Handles all user storage
}
