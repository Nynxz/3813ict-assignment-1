import {
  CanActivateFn,
  RedirectCommand,
  Router,
  UrlTree,
} from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const isloggedinGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(UserService).userInfo.value.isLoggedIn;
  if (!isLoggedIn) {
    const redirect = inject(Router).createUrlTree(['/login']);
    console.log('redirecting to login');
    return redirect;
  }
  return isLoggedIn;
};
