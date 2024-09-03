import { Group } from '../../../types/group.type';
import {
  Component,
  computed,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';

import { NavigationStart, Route, Router } from '@angular/router';
import { ChannelSidebarComponent } from '@components/ui/group/channel-sidebar/channel-sidebar.component';
import { ChannelWidgetComponent } from '@components/ui/group/channel-widget/channel-widget.component';
import { ChatPanelComponent } from '@components/ui/group/chat-panel/chat-panel.component';
import { ChatService } from '@services/chat/chat.service';
import { GroupService } from '@services/group/group.service';
import { Observable } from 'rxjs';
import { ChatHeaderComponent } from '../../components/ui/group/chat-header/chat-header.component';
import { ChannelSettingsPopupComponent } from '../../components/ui/group/channel-settings-popup/channel-settings-popup.component';
import { GroupSettingsComponent } from '../../components/ui/group/group-settings/group-settings.component';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    ChannelWidgetComponent,
    ChannelSidebarComponent,
    ChatPanelComponent,
    ChatHeaderComponent,
    ChannelSettingsPopupComponent,
    GroupSettingsComponent,
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css',
  host: {
    class: 'w-full h-full bg-primary flex flex-grow',
  },
})
export class GroupComponent {
  @Input()
  id = '';

  server: Group | undefined;

  openSettings = signal(false);

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
      this.router.navigateByUrl('/');
    }
  }
}
