import { Routes } from '@angular/router';

import { NotfoundComponent } from './404/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminGuard } from '../core/guards/admin.guard';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: NotfoundComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        canActivate: [AdminGuard],
        component: SignupComponent
      }
    ]
  }
];
