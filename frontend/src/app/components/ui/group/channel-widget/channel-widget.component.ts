import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'group-channel-widget',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './channel-widget.component.html',
  styleUrl: './channel-widget.component.css',
})
export class ChannelWidgetComponent {
  @Input()
  channelID: number | undefined;
  @Input()
  serverID: string | undefined;
}
