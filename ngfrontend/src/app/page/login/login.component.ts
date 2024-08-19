import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { PreferencesService } from '../../storage/preferences.service';
import { HelloworldService } from '../../test/helloworld.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';

type LoginResponse = {
  jwt: string;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  error = false;
  constructor(
    private loginService: LoginService,
    private preferencesService: PreferencesService,
    private helloWorldService: HelloworldService,
    private userService: UserService,
    private router: Router
  ) {}

  handleSubmit() {
    // submit to backend :) get jwt, store jwt, ez pz
    console.log(this.email, this.password);
    if (this.email == '' || this.password == '') {
      this.error = true;
      return;
    }
    this.loginService.login(this.email, this.password).subscribe({
      next: (e) => {
        console.log(e);
        let jwt: LoginResponse = e as LoginResponse;
        console.log(e);
        this.preferencesService.setItem('jwt', jwt.jwt);
        let jwtDecoded = this.loginService.decodeJWT(jwt.jwt) as {
          username: string;
        };
        console.log(jwtDecoded);
        this.userService.setUserInfo({
          username: jwtDecoded.username,
          isLoggedIn: true,
        });
        this.loginService.setDetails(jwtDecoded.username);
        this.userService.setIsLoggedInBoolean(true);
        this.helloWorldService.debug.next('DEBUG: YES!');
        this.router.navigateByUrl('/user');
      },
      error: (e) => {
        console.log(e);
        this.error = true;
      },
    });
    // window.location.reload();
  }

  logout() {
    this.loginService.logout();
    // window.location.reload();
  }
}
