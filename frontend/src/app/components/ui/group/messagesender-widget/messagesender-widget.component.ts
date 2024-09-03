import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '@services/chat/chat.service';

@Component({
  selector: 'group-messagesender-widget',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './messagesender-widget.component.html',
  styleUrl: './messagesender-widget.component.css',
})
export class MessagesenderWidgetComponent {
  message = '';

  constructor(private chatService: ChatService) {}
  send() {
    console.log(this.message);
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
