import { Component, computed, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloworldService } from './test/helloworld.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Home';
  message: string = 'Message Loading..';
  username = '';
  isLoggedIn = false;

  testSignalComputed = computed(
    () => `TEST SIGNAL RESULT: ${this.helloWorldService.testSignal()}`
  );

  constructor(
    private helloWorldService: HelloworldService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.userService.isLoggedIn.subscribe((e) => {
    //   console.log('APP COMPONENT: login changing', e);
    //   this.isLoggedIn = e;
    // });

    this.helloWorldService
      .getHelloWorld()
      .subscribe((message) => (this.message = message));
    this.helloWorldService.debug.subscribe(
      (e) => (this.username = e as string)
    );
  }
}
