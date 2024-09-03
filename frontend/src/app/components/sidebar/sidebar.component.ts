import { Component, computed, signal } from '@angular/core';
import { FoldButtonComponent } from './fold-button/fold-button.component';
import { NgClass } from '@angular/common';
import { LoginButtonComponent } from './login-button/login-button.component';
import { ServerWidgetComponent } from './server-widget/server-widget.component';
import { RouterLink } from '@angular/router';
import { PreferencesService } from '@services/preferences/preferences.service';
import { GroupService } from '@services/group/group.service';
import { Group } from '@/group.type';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    FoldButtonComponent,
    NgClass,
    LoginButtonComponent,
    ServerWidgetComponent,
    RouterLink,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(
    private userPreferences: PreferencesService,
    private groupService: GroupService
  ) {}

  selectedGroup = signal(undefined as Group | undefined);

  servers = computed(() => this.groupService.groups());

  folded = computed(() =>
    this.userPreferences.preferences().sidebarfolded == 'true' ? true : false
  );

  fold() {
    this.userPreferences.setItem(
      'sidebarfolded',
      this.folded() ? 'false' : 'true'
    );
  }

  selectGroup(group: Group | undefined) {
    this.selectedGroup.set(group);
  }
}
