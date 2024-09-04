import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { UserComponent } from './routes/user/user.component';
import { GroupComponent } from './routes/group/group.component';
import { NotfoundComponent } from './routes/notfound/notfound.component';
import { isloggedinGuard } from './guards/isloggedin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent, canActivate: [isloggedinGuard] },
  { path: 'chat', component: GroupComponent, canActivate: [isloggedinGuard] },
  { path: '**', component: NotfoundComponent },
];
