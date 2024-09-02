import { Group } from '../../../../types/group.type';
import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatService } from '@services/chat/chat.service';

@Component({
  selector: 'app-server-widget',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './server-widget.component.html',
  styleUrl: './server-widget.component.css',
})
export class ServerWidgetComponent {
  @Input() server: Group | undefined;
  @Input() folded: boolean | null = null;

  constructor(private chatService: ChatService) {}

  setGroup(group: Group | undefined) {
    this.chatService.selectGroup(group!);
  }
}
