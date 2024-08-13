import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloworldService } from './test/helloworld.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ngfrontend';
  message: string = '';
  constructor(private helloWorldService: HelloworldService) {}

  ngOnInit(): void {
    this.helloWorldService
      .getHelloWorld()
      .subscribe((message) => (this.message = message));
  }
}
