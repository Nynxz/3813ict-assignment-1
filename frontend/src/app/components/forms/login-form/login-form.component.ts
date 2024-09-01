import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  email = '';
  password = '';
  error = false;
  constructor(
    private userService: UserService // private helloWorldService: HelloworldService, // private preferencesService: PreferencesService, // private loginService: LoginService, // private userService: UserService, // private router: Router
  ) {}

  handleSubmit() {
    // submit to backend :) get jwt, store jwt, ez pz
    console.log(this.email, this.password);
    if (this.email == '' || this.password == '') {
      this.error = true;
      return;
    }
    this.userService.login(this.email, this.password);
    // this.loginService.login(this.email, this.password).subscribe({
    //   next: (e) => {
    //     console.log(e);
    //     let jwt: LoginResponse = e as LoginResponse;
    //     console.log(e);
    //     this.preferencesService.setItem('jwt', jwt.jwt);
    //     let jwtDecoded = this.loginService.decodeJWT(jwt.jwt) as {
    //       username: string;
    //     };
    //     console.log(jwtDecoded);
    //     this.userService.setUserInfo({
    //       username: jwtDecoded.username,
    //       isLoggedIn: true,
    //     });
    //     this.loginService.setDetails(jwtDecoded.username);
    //     this.userService.setIsLoggedInBoolean(true);
    //     this.helloWorldService.debug.next('DEBUG: YES!');
    //     this.router.navigateByUrl('/user');
    //   },
    //   error: (e) => {
    //     console.log(e);
    //     this.error = true;
    //   },
    // });
    // window.location.reload();
  }

  logout() {
    // this.loginService.logout();
    // window.location.reload();
  }
}
