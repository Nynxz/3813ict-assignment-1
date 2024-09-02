import { Error } from '@/error.class';
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
  Error = new Error();

  constructor(
    private userService: UserService // private helloWorldService: HelloworldService, // private preferencesService: PreferencesService, // private loginService: LoginService, // private userService: UserService, // private router: Router
  ) {}

  handleSubmit() {
    if (this.email == '' || this.password == '') {
      this.Error.set('Empty Input');
      return;
    } else {
      this.userService.login(this.email, this.password).then((e: any) => {
        if (e.error) {
          this.Error.set(e.error);
        }
      });
    }
  }
}
