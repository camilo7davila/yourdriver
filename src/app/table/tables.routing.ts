import { Routes } from '@angular/router';

import { UserTableComponent } from './user-table/user-table.component';
import { DriverTableComponent } from './driver-table/driver-table.component';
import { TripsTableComponent } from './trips-table/trips-table.component';
import { PendingDriverTableComponent } from './pending-driver-table/pending-driver-table.component';
import { TripsCancelTableComponent } from './trips-cancel-table/trips-cancel-table.component';

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usertable',
        component: UserTableComponent,
        data: {
          title: 'YourDrive',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Customers Table' }
          ]
        }
      },
      {
        path: 'drivertable',
        component: DriverTableComponent,
        data: {
          title: 'YourDrive',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Drivers table' }
          ]
        }
      },
      {
        path: 'historytripstable',
        component: TripsTableComponent,
        data: {
          title: 'YourDrive',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Color Tables' }
          ]
        }
      },
      {
        path: 'pendingdriverstrable',
        component: PendingDriverTableComponent,
        data: {
          title: 'YourDrive',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Color Tables' }
          ]
        }
      },
      {
        path: 'canceltriptable',
        component: TripsCancelTableComponent,
        data: {
          title: 'YourDrive',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Color Tables' }
          ]
        }
      },
      {
        path: 'cancelusertriptable',
        component: TripsCancelTableComponent,
        data: {
          title: 'YourDrive',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Color Tables' }
          ]
        }
      }
    ]
  }
];
