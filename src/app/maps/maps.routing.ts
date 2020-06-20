import { Routes } from '@angular/router';

import { MapTripComponent } from './map-trip/map-trip.component';
import { MapOnlineComponent } from './map-online/map-online.component';

export const MapRoutes: Routes = [
  {
    path: 'maps',
    children: [
      {
        path: ':id',
        component: MapTripComponent,
        data: {
          title: 'YourDrive',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Google Maps' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'onlive',
        component: MapOnlineComponent,
        data: {
          title: 'YourDrive',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Google Maps' }
          ]
        }
      }
    ]
  }
];
