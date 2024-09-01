import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'user-super-server-widget',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './super-server-widget.component.html',
  styleUrl: './super-server-widget.component.css',
})
export class SuperServerWidgetComponent {
  @Input() server: any;
  @Input() selected: any;
  selectedServer: any;
  folded = false;

  serverName = '';
  imageURL = '';

  fold() {
    this.selectedServer = this.server;
    // this.folded = !this.folded;
    console.log('Folding', this.server);
  }
}
