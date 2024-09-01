import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatService } from '@services/chat/chat.service';
import { Group } from '@services/group/group.service';

@Component({
  selector: 'app-server-widget',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './server-widget.component.html',
  styleUrl: './server-widget.component.css',
})
export class ServerWidgetComponent {
  @Input() server: Group | undefined;
  @Input() serverName = 'server';
  @Input() folded: boolean | null = null;
  @Input() imageURL: string | undefined =
    'https://i.guim.co.uk/img/media/8c7f4fe66d305fb86fc3246dd47a9c06d216f7ec/0_139_1268_761/master/1268.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=f27fa05d2f7629655beafeb9248c7647';

  constructor(private chatService: ChatService) {}

  setGroup(group: Group | undefined) {
    this.chatService.selectGroup(group!);
  }
}
