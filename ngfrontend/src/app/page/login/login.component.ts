import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { PreferencesService } from '../../storage/preferences.service';
import { HelloworldService } from '../../test/helloworld.service';

type LoginResponse = {
  jwt: string;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(
    private loginService: LoginService,
    private preferencesService: PreferencesService,
    private helloWorldService: HelloworldService
  ) {}

  handleSubmit() {
    // submit to backend :) get jwt, store jwt, ez pz
    console.log(this.email, this.password);
    this.loginService.login(this.email, this.password).subscribe((e) => {
      let jwt: LoginResponse = e as LoginResponse;
      console.log(e);
      this.preferencesService.setItem('jwt', jwt.jwt);
      let jwtDecoded = this.loginService.decodeJWT(jwt.jwt) as {
        username: string;
      };
      console.log(jwtDecoded);
      this.loginService.setDetails(jwtDecoded.username);
      this.helloWorldService.debug.next('DEBUG: YES!');
    });
    // window.location.reload();
  }

  logout() {
    this.loginService.logout();
    this.helloWorldService.debug.next('DEBUG: NO!');
    // window.location.reload();
  }
}
