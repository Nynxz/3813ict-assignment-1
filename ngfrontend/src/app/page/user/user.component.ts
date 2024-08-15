import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(private loginService: LoginService, private _router: Router) {}
  logout() {
    this.loginService.logout();
    this._router.navigateByUrl('/login');
  }
}
