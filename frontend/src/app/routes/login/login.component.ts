import { Component } from '@angular/core';
import { LoginFormComponent } from '@components/forms/login-form/login-form.component';
import { RegisterFormComponent } from '../../components/forms/register-form/register-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {
    class: 'w-full h-full bg-primary_400 overflow-hidden flex flex-grow',
  },
})
export class LoginComponent {
  isRegistering = false;
}
