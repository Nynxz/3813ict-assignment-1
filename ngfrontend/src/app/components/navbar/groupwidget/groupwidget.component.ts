import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-groupwidget',
  standalone: true,
  imports: [NgIf],
  templateUrl: './groupwidget.component.html',
  styleUrl: './groupwidget.component.css',
})
export class GroupwidgetComponent {
  @Input() serverName = 'server';
  @Input() folded: boolean | null = null;
  image = 'https://placehold.co/32x32';
}
