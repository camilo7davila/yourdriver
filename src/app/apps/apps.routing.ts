import { Routes } from '@angular/router';

import { MessagingComponent } from './messaging/messaging.component';
import { AdminGuard } from '../core/guards/admin.guard';
import { TariffComponent } from './tariff/tariff.component';

export const AppsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'messaging',
        component: MessagingComponent,
        data: {
          title: 'Send Notification Message',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Chat App' }
          ]
        }
      }
    ]
  },
  {
    path: 'tariff',
    canActivate: [AdminGuard],
    component: TariffComponent,
    data: {
      title: 'Edit the tariff',
      urls: [
        {title: 'Tariff'}
      ]
    }
  }
];
