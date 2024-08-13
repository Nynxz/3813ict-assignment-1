import { Component, OnInit } from '@angular/core';
import { GroupwidgetComponent } from './groupwidget/groupwidget.component';
import { CommonModule, NgIf } from '@angular/common';
import { PreferencesService } from '../../storage/preferences.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [GroupwidgetComponent, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  folded: boolean | null = null;
  constructor(private preferences: PreferencesService) {}

  ngOnInit(): void {
    this.folded = this.preferences.getItem('folded') === 'true';
  }

  fold() {
    this.folded = !this.folded;
    this.preferences.setItem('folded', this.folded.toString());
  }
}
