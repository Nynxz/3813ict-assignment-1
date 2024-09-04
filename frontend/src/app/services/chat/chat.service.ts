import { computed, Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreferencesService } from '@services/preferences/preferences.service';
import { Group } from '@/group.type';
import { Channel } from '@/channel.type';
import { environment } from '@environments/environment';
import { User } from '@/user.type';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  selectedGroup = signal(undefined as Group | undefined);
  selectedGroupUsers = signal(undefined as User[] | undefined);
  selectedChannel = signal(undefined as Channel | undefined);

  messages = signal(undefined as any | undefined);
  channels = signal(undefined as Channel[] | undefined);

  constructor(
    private httpClient: HttpClient,
    private preferencesService: PreferencesService
  ) {}

  selectGroup(group: Group) {
    this.selectedChannel.set(undefined);
    this.selectedGroup.set(group);
    this.refreshSelectedGroupChannels();
    this.updateGroupUsers();
  }

  selectChannel(channel: Channel | undefined) {
    this.selectedChannel.set(channel);
    this.refreshSelectedChannelMessages();
  }

  sendMessage(message: string) {
    return this.http_postMessageSend(message).subscribe((e) => {
      this.refreshSelectedChannelMessages();
    });
  }

  private refreshSelectedGroupChannels() {
    return this.http_getGroupChannels().subscribe((e) => {
      this.channels.set(e as Channel[]);
    });
  }

  updateGroupUsers() {
    this.http_getGroupUsers().subscribe((e) => {
      this.selectedGroupUsers.set(e as User[]);
    });
  }

  private refreshSelectedChannelMessages() {
    if (!this.selectedChannel()) return;
    this.http_getChannelMessages().subscribe((e) => {
      this.messages.set(e);
    });
  }

  /* HTTP */

  // POST /message/send
  http_postMessageSend(message: string) {
    return this.httpClient.post(
      environment.backend_base_URL + '/message/send',
      JSON.stringify({
        message: {
          content: message,
          channel: this.selectedChannel(),
        },
      }),
      {
        headers: {
          Authorization: 'Bearer ' + this.preferencesService.preferences().jwt,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // GET /channel/users
  http_getChannelUsers() {
    return this.httpClient.get(
      environment.backend_base_URL + '/channel/users',
      {
        headers: {
          channel: this.selectedChannel()!._id as string,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // GET /groups/channels
  http_getGroupChannels() {
    return this.httpClient.get(
      environment.backend_base_URL + '/groups/channels',
      {
        headers: {
          group: this.selectedGroup()!._id as string,
          Authorization: 'Bearer ' + this.preferencesService.preferences().jwt,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // GET /groups/users
  http_getGroupUsers() {
    return this.httpClient.get(environment.backend_base_URL + '/groups/users', {
      headers: {
        group: this.selectedGroup()?._id as string,
        'Content-Type': 'application/json',
      },
    });
  }

  // GET /channel/messages
  http_getChannelMessages() {
    return this.httpClient.get(
      environment.backend_base_URL + '/channel/messages',
      {
        headers: {
          channel: this.selectedChannel()?._id || '',
          Authorization: 'Bearer ' + this.preferencesService.preferences().jwt,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
