import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'user-super-settings-user-selector',
  standalone: true,
  imports: [NgClass],
  templateUrl: './super-settings-user-selector.component.html',
  styleUrl: './super-settings-user-selector.component.css',
  host: {
    class:
      'bg-primary_200 col-span-2 row-span-2 flex flex-grow flex-col rounded-md border-black border-[1px]',
  },
})
export class SuperSettingsUserSelectorComponent {
  @Input()
  users: any[] | undefined = undefined;

  @Output()
  selectUser = new EventEmitter<any>();

  lastSelected: any | undefined = undefined;

  emitSelectUser(user: any) {
    this.lastSelected = this.lastSelected == user ? undefined : user;
    this.selectUser.emit(this.lastSelected);
  }
}
