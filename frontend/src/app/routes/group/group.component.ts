import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NavigationStart, Router } from '@angular/router';
import { ChannelSidebarComponent } from '@components/ui/group/channel-sidebar/channel-sidebar.component';
import { ChannelWidgetComponent } from '@components/ui/group/channel-widget/channel-widget.component';
import { ChatPanelComponent } from '@components/ui/group/chat-panel/chat-panel.component';
import { Group, GroupService } from '@services/group/group.service';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    ChannelWidgetComponent,
    ChannelSidebarComponent,
    ChatPanelComponent,
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css',
  host: {
    class: 'w-full h-full bg-gray-500 overflow-hidden flex flex-grow',
  },
})
export class GroupComponent implements OnChanges {
  @Input()
  id = '';

  @Input()
  channel = '';
  server: Group | undefined;

  constructor(private groupService: GroupService) {
    this.groupService.getServers().subscribe((e) => {
      this.server = e.find((a) => a._id == this.id);
    });
  }

  ngOnChanges() {
    console.log(`Get Content - Channel:${this.channel}[Server:${this.id}]`);
    this.groupService.getServers().subscribe((e) => {
      this.server = e.find((a) => a._id == this.id);
    });
  }
}
