import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { SuperPanelComponent } from '../../components/user/super-panel/super-panel.component';
import { PanelAdminComponent } from '../../components/user/panel-admin/panel-admin.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SuperPanelComponent, PanelAdminComponent, NgClass],
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
  constructor(private loginService: LoginService, private _router: Router) {}

  // enum Roles {
  //   "USER",
  //   "ADMIN",
  //   "SUPER",
  // }
  ngOnInit(): void {
    this.tabs = this.loginService.getDetails().roles as number[];
    this.tabs.forEach((e) => {
      switch (e) {
        case 1:
          this.admin = true;
          break;
        case 2:
          this.super = true;
          break;
      }
    });
  }

  logout() {
    this.loginService.logout();
    this._router.navigateByUrl('/login');
  }
}
