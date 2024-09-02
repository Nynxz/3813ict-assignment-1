import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  constructor(private userService: UserService) {}
  userpwd = { username: '', pwd: '' };

  loginfunc() {
    this.userService.login(this.userpwd.username, this.userpwd.pwd);
    console.log(this.userpwd.username, this.userpwd.pwd);
  }
}
