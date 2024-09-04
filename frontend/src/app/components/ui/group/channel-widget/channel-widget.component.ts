import { Channel } from '../../../../../types/channel.type';
import { NgClass } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatService } from '@services/chat/chat.service';

@Component({
  selector: 'group-channel-widget',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './channel-widget.component.html',
  styleUrl: './channel-widget.component.css',
})
export class ChannelWidgetComponent {
  @Input()
  channel: Channel | undefined | any;

  @Input()
  selected = false;
  constructor(private chatService: ChatService) {}

  setChannel(channelID: string) {
    this.chatService.selectChannel(this.channel);
  }
}
