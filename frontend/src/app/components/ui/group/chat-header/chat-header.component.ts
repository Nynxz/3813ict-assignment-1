import { Channel } from '@/channel.type';
import {
  Component,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'group-chat-header',
  standalone: true,
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.css',
})
export class ChatHeaderComponent implements OnChanges {
  @Input()
  selectedChannel: Channel | undefined;

  @Input()
  openSettings: WritableSignal<boolean> = signal(false);

  openSettingsF() {
    this.openSettings.set(!this.openSettings());
  }

  ngOnChanges() {
    this.openSettings.set(false);
  }
}
