import { Component, OnInit } from '@angular/core';
import { GroupwidgetComponent } from './groupwidget/groupwidget.component';
import { CommonModule, NgIf } from '@angular/common';
import { PreferencesService } from '../../storage/preferences.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [GroupwidgetComponent, NgIf, RouterLink],
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
