import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sidebar-fold-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './fold-button.component.html',
  styleUrl: './fold-button.component.css',
})
export class FoldButtonComponent {
  @Output() clickEvent = new EventEmitter<MouseEvent>();
  folded = false;

  onClick(event: MouseEvent) {
    this.folded = !this.folded;
    this.clickEvent.emit(event);
    console.log(this.folded);
  }
}
