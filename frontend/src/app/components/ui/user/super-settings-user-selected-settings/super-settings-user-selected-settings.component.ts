import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SuperUserService } from '@services/super-user/super-user.service';

@Component({
  selector: 'user-super-settings-user-selected-settings',
  standalone: true,
  imports: [NgIf],
  templateUrl: './super-settings-user-selected-settings.component.html',
  styleUrl: './super-settings-user-selected-settings.component.css',
  host: {
    class:
      'bg-primary_200 col-span-2 row-span-2 flex flex-grow flex-col rounded-md border-black border-[1px]',
  },
})
export class SuperSettingsUserSelectedSettingsComponent implements OnChanges {
  @Input()
  selectedUser: any | undefined = undefined;
  roles: string = '';

  @Output()
  deleteUser = new EventEmitter<any>();

  confirmDelete = false;

  constructor(private superuserService: SuperUserService) {}

  ngOnChanges(): void {
    this.roles = this.getRolesText();
    this.confirmDelete = false;
  }

  getRolesText() {
    let t = '';
    this.selectedUser?.roles.sort().forEach((r: number) => {
      switch (r) {
        case 0:
          t += 'User ';
          break;
        case 1:
          t += 'Admin ';
          break;
        case 2:
          t += 'Super ';
          break;
      }
    });
    return t;
  }
  toggleSelectedUserRole(role: number) {
    let uR = this.selectedUser.roles;
    let i = uR.indexOf(role);
    i >= 0 ? uR.splice(i, 1) : uR.push(role);
    this.ngOnChanges();
  }

  saveUser() {
    this.superuserService.updateUser(this.selectedUser);
  }

  deleteSelectedUser() {
    if (!this.confirmDelete) {
      this.confirmDelete = true;
    } else {
      this.superuserService
        .http_postDeleteUser(this.selectedUser)
        .subscribe((e) => {
          this.deleteUser.emit(e);
          this.confirmDelete = false;
        });
    }
  }
}
