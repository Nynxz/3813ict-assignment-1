import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  Signal,
} from '@angular/core';

@Component({
  selector: 'sidebar-fold-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './fold-button.component.html',
  styleUrl: './fold-button.component.css',
})
export class FoldButtonComponent {
  @Output() clickEvent = new EventEmitter<MouseEvent>();
  @Input() folded: Signal<Boolean> = signal(false);

  onClick(event: MouseEvent) {
    this.clickEvent.emit(event);
  }
}
