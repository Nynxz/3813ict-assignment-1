import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-widget',
  standalone: true,
  imports: [NgIf],
  templateUrl: './server-widget.component.html',
  styleUrl: './server-widget.component.css',
})
export class ServerWidgetComponent {
  @Input() serverName = 'server';
  @Input() folded: boolean | null = null;
  @Input() imageURL: string | undefined =
    'https://i.guim.co.uk/img/media/8c7f4fe66d305fb86fc3246dd47a9c06d216f7ec/0_139_1268_761/master/1268.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=f27fa05d2f7629655beafeb9248c7647';
}
