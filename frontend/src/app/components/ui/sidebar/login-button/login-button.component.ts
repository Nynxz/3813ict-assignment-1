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
import { UserService } from '../../../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sidebar-login-button',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css',
})
export class LoginButtonComponent {
  //inject duh user service, use duh user service, be the user service :) - someone, 2024
  constructor(private userService: UserService) {}

  @Output() clickEvent = new EventEmitter<MouseEvent>();
  @Input() folded: Signal<Boolean> = signal(false);
  name = computed(() => this.userService.name());

  onClick(event: MouseEvent) {
    this.clickEvent.emit(event);
    console.log(this.folded);
  }
}
