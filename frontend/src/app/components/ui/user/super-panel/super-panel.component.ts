import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SuperServerWidgetComponent } from '../super-server-widget/super-server-widget.component';
import { SuperUpdateServerPanelComponent } from '../super-update-server-panel/super-update-server-panel.component';
import { GroupService } from '@services/group/group.service';

@Component({
  selector: 'user-super-panel',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    SuperServerWidgetComponent,
    SuperUpdateServerPanelComponent,
  ],
  templateUrl: './super-panel.component.html',
  styleUrl: './super-panel.component.css',
})
export class SuperPanelComponent {
  groups: any;
  selectedGroup: any = { groupName: '' };
  creating = true;
  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.http_getGroups().subscribe((e) => (this.groups = e));
  }

  newGroup() {
    this.creating = true;
    this.selectedGroup = { groupName: '' };
    console.log(this.selectedGroup);
  }

  selectGroup(group: any) {
    this.creating = false;
    this.selectedGroup = group;
    console.log(this.selectedGroup);
  }
}
