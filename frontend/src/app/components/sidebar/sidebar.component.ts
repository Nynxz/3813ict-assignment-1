import { Component, computed } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { FoldButtonComponent } from '../ui/sidebar/fold-button/fold-button.component';
import { NgClass } from '@angular/common';
import {
  PreferencesService,
  UserPreferences,
} from '../../services/preferences.service';
import { LoginButtonComponent } from '../ui/sidebar/login-button/login-button.component';
import { UserService } from '../../services/user.service';
import { ServerWidgetComponent } from '../ui/sidebar/server-widget/server-widget.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ButtonComponent,
    FoldButtonComponent,
    NgClass,
    LoginButtonComponent,
    ServerWidgetComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(
    private userPreferences: PreferencesService,
    private userService: UserService
  ) {}
  folded = computed(() =>
    this.userPreferences.preferences().sidebarfolded == 'true' ? true : false
  );

  fold() {
    this.userPreferences.setItem(
      'sidebarfolded',
      this.folded() ? 'false' : 'true'
    );
  }

  logout() {
    this.userService.logout();
  }
}
