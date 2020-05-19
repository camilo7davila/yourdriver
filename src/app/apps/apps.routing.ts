import { Routes } from '@angular/router';

import { MessagingComponent } from './messaging/messaging.component';

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
  }
];
