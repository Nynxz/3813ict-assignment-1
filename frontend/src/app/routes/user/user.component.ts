import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminPanelComponent } from '@components/ui/user/admin-panel/admin-panel.component';
import { SuperPanelComponent } from '@components/ui/user/super-panel/super-panel.component';
import { UserService } from '@services/user/user.service';

enum Roles {
  'USER',
  'ADMIN',
  'SUPER',
}
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgClass, AdminPanelComponent, SuperPanelComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  host: {
    class: 'w-full h-full bg-gray-500 overflow-hidden',
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
    this.tabs = this.userService.user().roles as number[];
    this.tabs?.forEach((e) => {
      switch (e) {
        case Roles.ADMIN:
          this.admin = true;
          break;
        case Roles.SUPER:
          this.super = true;
          break;
      }
    });
  }

  logout() {
    this.userService.logout();
  }
}
