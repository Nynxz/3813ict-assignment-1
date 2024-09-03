import { Channel } from '@/channel.type';
import {
  Component,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { TestComponent } from '../../../../../test/test/test.component';
import { ButtonComponent } from '../../../../../test/button/button.component';

@Component({
  selector: 'group-chat-header',
  standalone: true,
  imports: [TestComponent, ButtonComponent],
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

  ngOnChanges(changes: SimpleChanges): void {
    this.openSettings.set(false);
  }
}
