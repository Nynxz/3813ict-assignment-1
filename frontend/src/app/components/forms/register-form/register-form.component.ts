import { Error } from '@/error.class';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  email = '';
  password = '';
  username = '';

  Error = new Error();

  constructor(private userService: UserService) {}

  handleLoginSubmit() {
    if (this.email == '' || this.password == '') {
      this.Error.set('Empty Input');
    } else {
      this.userService.login(this.email, this.password).then((e: any) => {
        if (e.error) {
          this.Error.set(e.error);
        }
      });
    }
  }

  handleRegisterSubmit() {
    if (this.email == '' || this.password == '' || this.username == '') {
      this.Error.set('Empty Input');
    } else {
      this.userService
        .register(this.email, this.password, this.username)
        .then((e: any) => {
          if (e.error) {
            this.Error.set(e.error);
          }
        });
    }
  }
}
