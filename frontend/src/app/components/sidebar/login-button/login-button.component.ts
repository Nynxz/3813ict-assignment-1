import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
  Signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'sidebar-login-button',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css',
})
export class LoginButtonComponent {
  //inject duh user service, use duh user service, be the user service :) - someone, 2024
  @Input() folded: Signal<Boolean> = signal(false);
  name = computed(() => this.userService.user()?.username);
  constructor(private userService: UserService) {}
}
