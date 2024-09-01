import { computed, Injectable, Signal, signal } from '@angular/core';
import { Group } from '@services/group/group.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  selectedGroup = signal(undefined as Group | undefined);
  selectedChannel = signal(undefined as number | undefined);
  constructor() {}

  selectGroup(group: Group) {
    this.selectedChannel.set(undefined);
    this.selectedGroup.set(group);
  }

  selectChannel(channel: number | undefined) {
    console.log(channel);
    this.selectedChannel.set(channel);
  }
}
