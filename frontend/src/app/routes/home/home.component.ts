import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {
    class: 'w-full h-full bg-primary_400 overflow-hidden flex flex-grow',
  },
})
export class HomeComponent {}
