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
    this._getGroupChannels();
    this.updateGroupUsers();
  }

  selectChannel(channel: Channel | undefined) {
    console.log(channel);
    this.selectedChannel.set(channel);
    this._getChannelMessages();
  }

  sendMessage(message: string) {
    return this.httpClient
      .post(
        environment.backend_base_URL + '/message/send',
        JSON.stringify({
          message: {
            content: message,
            channel: this.selectedChannel(),
          },
          jwt: this.preferencesService.getItem('jwt'),
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe((e) => {
        this._getChannelMessages();
      });
  }
  private _getGroupChannels() {
    return this.httpClient
      .post(
        environment.backend_base_URL + '/channels',
        JSON.stringify({
          group: this.selectedGroup()!._id,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe((e) => {
        console.log(e);
        this.channels.set(e as Channel[]);
      });
  }

  private _getChannelMessages() {
    return this.httpClient
      .post(
        environment.backend_base_URL + '/channel/messages',
        JSON.stringify({
          channel: this.selectedChannel(),
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe((e) => {
        console.log(e);
        this.messages.set(e);
      });
  }

  updateGroupUsers() {
    this._getGroupUsers();
  }

  private _getGroupUsers() {
    return this.httpClient
      .post(
        environment.backend_base_URL + '/groups/users',
        JSON.stringify({
          group: this.selectedGroup()?._id,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe((e) => {
        console.log(e);
        console.log(this.selectedGroup()?._id);
        this.selectedGroupUsers.set(e as User[]);
      });
  }
}
