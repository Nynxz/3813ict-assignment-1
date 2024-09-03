import { CommonModule, NgClass, NgIf } from '@angular/common';
import {
  Component,
  computed,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { UserService } from '@services/user/user.service';
import { SuperSettingsUserSelectorComponent } from '../super-settings-user-selector/super-settings-user-selector.component';
import { SuperSettingsUserSelectedSettingsComponent } from '../super-settings-user-selected-settings/super-settings-user-selected-settings.component';

@Component({
  selector: 'user-super-settings',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    CommonModule,
    SuperSettingsUserSelectorComponent,
    SuperSettingsUserSelectedSettingsComponent,
  ],
  templateUrl: './super-settings.component.html',
  styleUrl: './super-settings.component.css',
  host: {
    class:
      'flex flex-grow grid grid-cols-10 grid-rows-5 bg-primary_100 rounded-md p-2 gap-2',
  },
})
export class SuperSettingsComponent {
  users: any[] | undefined;
  selectedUser: any = undefined;

  roles = computed(() => {});

  constructor(private userService: UserService) {
    this.refreshUsers();
  }

  refreshUsers() {
    this.userService.getAllUsers().subscribe((e) => {
      if (e) this.users = e as any[] | [];
    });
  }

  selectUser(user: any) {
    // this.refreshUsers();
    this.selectedUser = user;
  }

  toggleSelectedUserRole(role: number) {
    this.selectedUser.update((e: any) => {
      let i = e.roles.indexOf(role);
      i >= 0 ? e.roles.splice(i, 1) : e.roles.push(role);
      return { ...e };
    });
  }
}
