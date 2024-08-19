import { Component } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { FoldButtonComponent } from '../ui/sidebar/fold-button/fold-button.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonComponent, FoldButtonComponent, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  folded = true;
  fold() {
    console.log('folding?');
    this.folded = !this.folded;
  }
}
