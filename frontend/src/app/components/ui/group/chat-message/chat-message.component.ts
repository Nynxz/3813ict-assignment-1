import { Component, Input } from '@angular/core';

@Component({
  selector: 'group-chat-message',
  standalone: true,
  imports: [],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css',
})
export class ChatMessageComponent {
  @Input() fromUser = false;
}
