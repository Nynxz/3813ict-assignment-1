import { Component, OnInit } from '@angular/core';
import { GroupwidgetComponent } from './groupwidget/groupwidget.component';
import { CommonModule, NgIf } from '@angular/common';
import { PreferencesService } from '../../storage/preferences.service';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [GroupwidgetComponent, NgIf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  folded: boolean | null = null;
  username: string = '';
  userIconLink = '/login';
  constructor(
    private preferences: PreferencesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.username.subscribe((e) => {
      this.username = e as string;
    });
    this.username = this.loginService.getDetails().username;
    if (this.username) {
      this.userIconLink = '/user';
    }
    this.folded = this.preferences.getItem('folded') === 'true';
  }

  fold() {
    this.folded = !this.folded;
    this.preferences.setItem('folded', this.folded.toString());
  }
}
