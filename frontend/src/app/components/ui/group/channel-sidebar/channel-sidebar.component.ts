import { Component, Input } from '@angular/core';
import { ChannelWidgetComponent } from '../channel-widget/channel-widget.component';
import { Group } from '@services/group/group.service';

@Component({
  selector: 'group-channel-sidebar',
  standalone: true,
  imports: [ChannelWidgetComponent],
  templateUrl: './channel-sidebar.component.html',
  styleUrl: './channel-sidebar.component.css',
})
export class ChannelSidebarComponent {
  @Input()
  server: Group | undefined;
}
