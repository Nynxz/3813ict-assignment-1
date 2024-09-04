import { Channel } from '@/channel.type';
import { User } from '@/user.type';
import { NgClass, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '@services/chat/chat.service';
import { GroupService } from '@services/group/group.service';

enum Tabs {
  USERS,
  CHANNELS,
  ADMINS,
}

@Component({
  selector: 'group-settings',
  standalone: true,
  imports: [NgClass, NgIf, FormsModule],
  templateUrl: './group-settings.component.html',
  styleUrl: './group-settings.component.css',
  host: {
    class: 'flex flex-grow',
  },
})
export class GroupSettingsComponent {
  channels = computed(() => this.chatService.channels());

  users = computed(() => this.chatService.selectedGroupUsers());

  selectedTab: Tabs = Tabs.USERS;

  configChannel = signal(undefined as Channel | undefined);
  configUser = signal(undefined as User | undefined);

  channelName = '';

  newUserToAdd = '';

  constructor(
    private chatService: ChatService,
    private groupService: GroupService
  ) {}

  createChannel() {
    this.groupService.createChannel({
      name: 'New Channel',
      group: this.chatService.selectedGroup()!._id,
    });
  }

  setConfigChannel(channel: Channel) {
    if (channel == this.configChannel()) {
      this.configChannel.set(undefined);
      this.channelName = '';
    } else {
      console.log(channel);
      this.configChannel.set(channel);
      this.channelName = channel.name;
    }
  }
  setConfigUser(user: User) {
    if (user == this.configUser()) {
      this.configUser.set(undefined);
    } else {
      console.log(user);
      this.configUser.set(user);
    }
  }

  saveChannelConfig() {
    this.groupService.updateChannel({
      ...this.configChannel()!,
      name: this.channelName,
    });
  }

  addUser() {
    console.log(this.chatService.selectedGroup());
    this.groupService.addUserToGroup(
      this.newUserToAdd,
      this.chatService.selectedGroup()!._id
    );
    this.newUserToAdd = '';
  }

  kickUserFromGroup() {
    this.groupService
      .http_postRemoveUserFromGroup(
        this.configUser()?.username!,
        this.chatService.selectedGroup()?._id!
      )
      .subscribe((e) => {
        this.chatService.selectGroup(this.chatService.selectedGroup()!);
      });
  }

  promoteUserToGroupAdmin() {
    //TODO this & auth deleting & makings groups
    this.groupService
      .http_postPromoteUserOfGroup(
        this.configUser()?.username!,
        this.chatService.selectedGroup()?._id!
      )
      .subscribe((e) => {
        console.log(e);
        this.chatService.selectGroup(this.chatService.selectedGroup()!);
      });
    console.log(this.configUser());
  }
}
