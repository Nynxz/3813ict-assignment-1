import { Component, computed } from '@angular/core';
import { MessagesenderWidgetComponent } from '../messagesender-widget/messagesender-widget.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatService } from '@services/chat/chat.service';

@Component({
  selector: 'group-chat-panel',
  standalone: true,
  imports: [MessagesenderWidgetComponent, ChatMessageComponent],
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.css',
  host: {
    class: 'w-full h-full bg-primary_400 overflow-hidden flex flex-grow',
  },
})
export class ChatPanelComponent {
  messages = computed(() => this.chatService.messages());
  constructor(private chatService: ChatService) {}
}
