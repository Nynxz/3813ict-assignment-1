import { Component, Input, signal, WritableSignal } from '@angular/core';
import { GroupService } from '@services/group/group.service';

@Component({
  selector: 'group-channel-settings-popup',
  standalone: true,
  imports: [],
  templateUrl: './channel-settings-popup.component.html',
  styleUrl: './channel-settings-popup.component.css',
  host: {
    class: 'absolute right-2 top-10 rounded-md p-2',
  },
})
export class ChannelSettingsPopupComponent {
  @Input()
  openSettings: WritableSignal<boolean> = signal(false);

  constructor(private groupService: GroupService) {}
  deleteChannel() {
    this.openSettings.set(false);
    this.groupService.deleteSelectedChannel();
  }
}
