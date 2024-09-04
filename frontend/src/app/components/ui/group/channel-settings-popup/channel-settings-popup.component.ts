import {
  Component,
  computed,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { GroupService } from '@services/group/group.service';
import { SuperSettingsUserSelectorComponent } from '../../user/super-settings-user-selector/super-settings-user-selector.component';
import { ChatService } from '@services/chat/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'group-channel-settings-popup',
  standalone: true,
  imports: [SuperSettingsUserSelectorComponent, FormsModule],
  templateUrl: './channel-settings-popup.component.html',
  styleUrl: './channel-settings-popup.component.css',
  host: {
    class: 'absolute right-2 top-10 rounded-md p-2 w-72',
  },
})
export class ChannelSettingsPopupComponent {
  @Input()
  openSettings: WritableSignal<boolean> = signal(false);

  channelUsers = [] as any[];

  selectedUser = undefined as any;
  userToAdd = '';
  constructor(
    private groupService: GroupService,
    private chatService: ChatService
  ) {
    this.getChannelUsers();
  }

  deleteChannel() {
    this.openSettings.set(false);
    this.groupService.deleteSelectedChannel();
  }

  getChannelUsers() {
    this.chatService.http_getChannelUsers().subscribe((e: any) => {
      console.log(e.users);
      this.channelUsers = e.users as any[];
    });
  }

  removeUserFromChannel() {
    this.groupService
      .http_postRemoveUserFromChannel(
        this.chatService.selectedChannel()?._id || '',
        this.selectedUser.username
      )
      .subscribe((e) => {
        this.getChannelUsers();
        console.log(e);
      });
  }

  addUserToChannel() {
    console.log(this.userToAdd);
    this.groupService
      .http_postAddUserToChannel(
        this.chatService.selectedChannel()?._id || '',
        this.userToAdd
      )
      .subscribe((e) => {
        this.getChannelUsers();
        console.log(e);
      });
    this.userToAdd = '';
  }
}
