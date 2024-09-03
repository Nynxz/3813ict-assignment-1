import {
  Component,
  computed,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { ChannelWidgetComponent } from '../channel-widget/channel-widget.component';
import { GroupService } from '@services/group/group.service';
import { ChatService } from '@services/chat/chat.service';

@Component({
  selector: 'group-channel-sidebar',
  standalone: true,
  imports: [ChannelWidgetComponent],
  templateUrl: './channel-sidebar.component.html',
  styleUrl: './channel-sidebar.component.css',
})
export class ChannelSidebarComponent {
  group = computed(() => this.chatService.selectedGroup());
  channels = computed(() => this.chatService.channels());
  selected = computed(() => this.chatService.selectedChannel() || { _id: '' });

  @Input()
  goToGroupHomeBind: WritableSignal<boolean> = signal(false);

  constructor(
    private chatService: ChatService,
    private groupService: GroupService
  ) {}

  goToGroupSettings() {
    this.goToGroupHome();
    this.goToGroupHomeBind.set(true);
  }

  goToGroupHome() {
    this.goToGroupHomeBind.set(false);
    this.chatService.selectChannel(undefined);
  }

  // createChannel() {
  //   console.log(this.group());
  //   this.groupService.createChannel({
  //     name: 'test',
  //     group: this.group()!._id,
  //   });
  // }
}
