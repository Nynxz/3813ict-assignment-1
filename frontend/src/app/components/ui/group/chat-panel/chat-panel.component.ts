import { Component } from '@angular/core';
import { MessagesenderWidgetComponent } from '../messagesender-widget/messagesender-widget.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'group-chat-panel',
  standalone: true,
  imports: [MessagesenderWidgetComponent, ChatMessageComponent],
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.css',
  host: {
    class: 'w-full h-full bg-gray-500 overflow-hidden flex flex-grow',
  },
})
export class ChatPanelComponent {}
