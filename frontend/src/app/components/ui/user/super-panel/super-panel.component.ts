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
  servers: any;
  selectedServer: any = { serverName: '' };
  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.getServers().subscribe((e) => (this.servers = e));
  }
}
