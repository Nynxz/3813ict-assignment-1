import { Component } from '@angular/core';
import { TestComponent } from '../../test/test/test.component';
import { LoginFormComponent } from '@components/forms/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TestComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {
    class: 'w-full h-full bg-gray-500 overflow-hidden flex flex-grow',
  },
})
export class LoginComponent {}
