import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatService } from '@services/chat/chat.service';

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

  constructor(private chatService: ChatService) {}

  setChannel(channelID: number) {
    console.log('set channel', channelID);
    this.chatService.selectChannel(channelID);
  }
}
