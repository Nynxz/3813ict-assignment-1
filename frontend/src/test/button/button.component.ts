import { Component, EventEmitter, Output } from '@angular/core';
/**
 * NOT USED - TESTED EVENTEMITTERS
 */
@Component({
  selector: 'x-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Output() clickEvent = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    this.clickEvent.emit(event);
  }
}
