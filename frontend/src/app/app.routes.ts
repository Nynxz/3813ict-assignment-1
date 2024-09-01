import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { UserComponent } from './routes/user/user.component';
import { GroupComponent } from './routes/group/group.component';
import { NotfoundComponent } from './routes/notfound/notfound.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'group/:id/:channel', component: GroupComponent },
  { path: 'group/:id', component: GroupComponent },
  { path: 'chat', component: GroupComponent },
  { path: '**', component: NotfoundComponent },
];
