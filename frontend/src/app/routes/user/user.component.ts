import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminPanelComponent } from '@components/ui/user/admin-panel/admin-panel.component';
import { SuperPanelComponent } from '@components/ui/user/super-panel/super-panel.component';
import { UserService } from '@services/user/user.service';
import { SuperSettingsComponent } from '../../components/ui/user/super-settings/super-settings.component';

enum Roles {
  'USER',
  'ADMIN',
  'SUPER',
}
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgClass,
    AdminPanelComponent,
    SuperPanelComponent,
    SuperSettingsComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  host: {
    class: 'w-full h-full bg-primary_400 overflow-hidden flex flex-grow',
  },
})
export class UserComponent implements OnInit {
  selected = 0;
  tabs: number[] = [];
  admin = false;
  super = false;

  constructor(private userService: UserService) {}
  // enum Roles {
  //   "USER", 0
  //   "ADMIN", 1
  //   "SUPER", 2
  // }
  ngOnInit(): void {
    this.tabs = this.userService.user()?.roles as number[];
    this.tabs?.forEach((e) => {
      switch (e) {
        case Roles.ADMIN:
          this.admin = true;
          this.selected = 1;
          break;
        case Roles.SUPER:
          this.admin = true;  
          this.super = true;
          break;
      }
    });
  }

  logout() {
    this.userService.logout();
  }
}
