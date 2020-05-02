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
      {
        path: 'starter',
        canActivate: [AdminGuard],
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
      },
      {
        path: 'component',
        canActivate: [AdminGuard],
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      { path: 'cards', loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule) },
      { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
      { path: 'forms', loadChildren: () => import('./form/forms.module').then(m => m.FormModule) },
      { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartModule) },
      {
        path: 'widgets',
        canActivate: [AdminGuard],
        loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
      },
      { path: 'ecom',canActivate: [AdminGuard], loadChildren: () => import('./ecommerce/ecom.module').then(m => m.EcomModule) },
      {
        path: 'timeline',
        canActivate: [AdminGuard],
        loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
      },
      {
        path: 'extra-component',
        canActivate: [AdminGuard],
        loadChildren:
          () => import('./extra-component/extra-component.module').then(m => m.ExtraComponentModule)
      },
      { path: 'apps',canActivate: [AdminGuard], loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
      {
        path: 'apps/email',
        loadChildren: () => import('./apps/email/mail.module').then(m => m.MailModule)
      },
      { path: 'maps', canActivate: [AdminGuard], loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
      {
        path: 'sample-pages',
        canActivate: [AdminGuard],
        loadChildren: () => import('./sample-pages/sample-pages.module').then(m => m.SamplePagesModule)
      }
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
