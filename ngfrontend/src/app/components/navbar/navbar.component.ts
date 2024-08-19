import { Component, OnInit } from '@angular/core';
import { GroupwidgetComponent } from './groupwidget/groupwidget.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { PreferencesService } from '../../storage/preferences.service';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { HelloworldService } from '../../test/helloworld.service';
import { UserService } from '../../services/user.service';

type servers = {
  serverName: string;
  imageURL?: string;
};

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [GroupwidgetComponent, NgIf, NgFor, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  folded: boolean | null = null;
  username: string = '';
  userIconLink = '/login';
  servers: servers[] = [];

  constructor(
    private preferences: PreferencesService,
    private loginService: LoginService,
    private userService: UserService,
    private helloworldService: HelloworldService
  ) {}

  ngOnInit(): void {
    this.folded = this.preferences.getItem('folded') === 'true';

    this.userService.userInfo.subscribe((e) => {
      this.username = e.username;
      if (this.username) {
        this.userIconLink = '/user';
        this._updateServerList();
      } else {
        this.userIconLink = '/login';
      }
    });

    // this.username = this.loginService.getDetails().username;
    if (this.userService.userInfo.value.isLoggedIn == false) return; // Not Logged In, do not fetch servers etc
  }

  _updateServerList() {
    this.helloworldService.getServers().subscribe((e) => {
      console.log(e);
      this.servers = e as servers[];
    });
  }

  fold() {
    this.folded = !this.folded;
    this.preferences.setItem('folded', this.folded.toString());
  }
}
