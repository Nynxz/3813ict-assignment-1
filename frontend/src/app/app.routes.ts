import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { UserComponent } from './routes/user/user.component';
import { GroupComponent } from './routes/group/group.component';
import { NotfoundComponent } from './routes/notfound/notfound.component';
import {
  GuardIsLoggedIn,
  GuardIsLoggedInRedirectTo,
} from './guards/isloggedin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [GuardIsLoggedInRedirectTo('/login')],
  },
  {
    path: 'chat',
    component: GroupComponent,
    canActivate: [GuardIsLoggedIn],
  },
  { path: '**', component: NotfoundComponent },
];
