import { CommonModule } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'group-chat-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css',
  host: {
    class: 'w-full  items-center flex justify-center flex-grow ',
  },
})
export class ChatMessageComponent {
  @Input() fromUser = false;
  @Input() message = undefined as any;
  userId = computed(() => this.userService.user()?._id);
  constructor(private userService: UserService) {}
}
