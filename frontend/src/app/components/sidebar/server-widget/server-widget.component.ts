import { Group } from '../../../../types/group.type';
import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatService } from '@services/chat/chat.service';

@Component({
  selector: 'sidebar-server-widget',
  standalone: true,
  imports: [NgClass, NgIf, RouterLink],
  templateUrl: './server-widget.component.html',
  styleUrl: './server-widget.component.css',
})
export class ServerWidgetComponent {
  @Input() server: Group | undefined;
  @Input() folded: boolean | null = null;
  @Input() selected: boolean | null = null;
  @Output() clickEvent = new EventEmitter<MouseEvent>();

  constructor(private chatService: ChatService) {}

  setGroup(group: Group | undefined) {
    this.chatService.selectGroup(group!);
  }

  onClick(event: MouseEvent) {
    this.clickEvent.emit(event);
  }
}
