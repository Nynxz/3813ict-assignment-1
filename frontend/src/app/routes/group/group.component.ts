import {
  Component,
  computed,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { NavigationStart, Route, Router } from '@angular/router';
import { ChannelSidebarComponent } from '@components/ui/group/channel-sidebar/channel-sidebar.component';
import { ChannelWidgetComponent } from '@components/ui/group/channel-widget/channel-widget.component';
import { ChatPanelComponent } from '@components/ui/group/chat-panel/chat-panel.component';
import { ChatService } from '@services/chat/chat.service';
import { Group, GroupService } from '@services/group/group.service';
import { Observable } from 'rxjs';

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

  // selected = computed(() => {
  //   return (
  //     ' ' +
  //     JSON.stringify(this.chatService.selectedChannel()) +
  //     ' ' +
  //     JSON.stringify(this.chatService.selectedGroup())
  //   );
  // });

  selectedGroup = computed(() => {
    return this.chatService.selectedGroup();
  });
  selectedChannel = computed(() => {
    return this.chatService.selectedChannel();
  });

  constructor(
    private groupService: GroupService,
    private chatService: ChatService,
    private router: Router
  ) {
    this.groupService.getGroups().subscribe((e) => {
      this.server = e.find((a) => a._id == this.id);
    });
    if (!this.selectedGroup()) {
      console.log('NO GROUP?');
      this.router.navigateByUrl('/');
    }
  }

  ngOnChanges() {
    console.log(`Get Content - Channel:${this.channel}[Server:${this.id}]`);
    this.groupService.getGroups().subscribe((e) => {
      this.server = e.find((a) => a._id == this.id);
    });
  }
}
