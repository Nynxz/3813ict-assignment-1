import { Component } from '@angular/core';
import { GroupwidgetComponent } from './groupwidget/groupwidget.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [GroupwidgetComponent, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  folded = false;

  fold() {
    this.folded = !this.folded;
    console.log(this.folded);
  }
}
