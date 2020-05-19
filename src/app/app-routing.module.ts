import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { path } from 'd3';
import { AdminGuard } from './core/guards/admin.guard';

export const Approutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AdminGuard],
        loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule)
      },
      { path: 'tables',canActivate: [AdminGuard], loadChildren: () => import('./table/tables.module').then(m => m.TablesModule) },
      {
        path: 'profile',
        canActivate: [AdminGuard],
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      { path: 'apps',canActivate: [AdminGuard], loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
      {
        path: 'apps/email',
        loadChildren: () => import('./apps/email/mail.module').then(m => m.MailModule)
      },
      { path: 'maps', canActivate: [AdminGuard], loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren:
          () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
