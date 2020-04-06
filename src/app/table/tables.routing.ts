import { Routes } from '@angular/router';

import { DatatableComponent } from './data-table/data-table.component';
import { SmarttableComponent } from './smart-table/smart-table.component';
import { BasictableComponent } from './basic/basic.component';
import { DarktableComponent } from './dark-basic/dark.component';
import { ColortableComponent } from './color-table/color.component';
import { TablesizeComponent } from './sizing/size.component';
import { UserTableComponent } from './user-table/user-table.component';
import { DriverTableComponent } from './driver-table/driver-table.component';
import { TripsTableComponent } from './trips-table/trips-table.component';
import { PendingDriverTableComponent } from './pending-driver-table/pending-driver-table.component';

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'datatable',
        component: DatatableComponent,
        data: {
          title: 'Data Table',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Data Table' }
          ]
        }
      },
      {
        path: 'usertable',
        component: UserTableComponent,
        data: {
          title: 'YourDrive',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Color Tables' }
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
            { title: 'Color Tables' }
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
        path: 'basictables',
        component: BasictableComponent,
        data: {
          title: 'Basic Tables',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Basic Tables' }
          ]
        }
      },
      {
        path: 'darktables',
        component: DarktableComponent,
        data: {
          title: 'Dark Tables',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Dark Tables' }
          ]
        }
      },
      {
        path: 'colortables',
        component: ColortableComponent,
        data: {
          title: 'Color Tables',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Color Tables' }
          ]
        }
      },
      {
        path: 'tablesizing',
        component: TablesizeComponent,
        data: {
          title: 'Table Sizing',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Table Sizing' }
          ]
        }
      },
      {
        path: 'smarttable',
        component: SmarttableComponent,
        data: {
          title: 'Smart Table',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Smart Table' }
          ]
        }
      }
    ]
  }
];
