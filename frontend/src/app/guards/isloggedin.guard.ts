import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '@services/user/user.service';

export function GuardIsLoggedInRedirectTo(toRedirect: string) {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const isLoggedIn = inject(UserService).user()?.username;
    if (!isLoggedIn) {
      const redirect = inject(Router).createUrlTree([toRedirect]);
      return redirect;
    }
    return true;
  };
}

export const GuardIsLoggedIn = GuardIsLoggedInRedirectTo('');
