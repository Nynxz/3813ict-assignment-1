import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@services/user/user.service';

export const isloggedinGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(UserService).user()?.username;
  if (!isLoggedIn) {
    const redirect = inject(Router).createUrlTree(['/']);
    return redirect;
  }
  return true;
  // if (!isLoggedIn) {
  //   const redirect = inject(Router).createUrlTree(['/login']);
  //   console.log('redirecting to login');
  //   return redirect;
  // }
  // return isLoggedIn;
};
