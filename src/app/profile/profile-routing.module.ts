import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableUserComponent } from './table-user/table-user.component';
import { TableDriverComponent } from './table-driver/table-driver.component';
import { TableTripComponent } from './table-trip/table-trip.component';
import { PendingDriverComponent } from './pending-driver/pending-driver.component';
import { ProfileCancelTripComponent } from './profile-cancel-trip/profile-cancel-trip.component';


const routes: Routes = [
  {
    path: 'userprofile',
    children: [
      {
        path: ':id',
        component: TableUserComponent,
        data: {
          title: 'YourDrive',
          urls: [
            { title: 'Profile URL', url: '/profile' },
            { title: 'User profile' }
          ] 
        }
      }
    ]
  },
  {
    path: 'driverprofile',
    children: [
      {
        path: ':id',
        component: TableDriverComponent,
        data: {
          title: 'YourDriver',
          urls: [
            { title: 'Profile', url: '/profile' },
            { title: 'Driver profile' }
          ]
        }
      }
    ]
  },
  {
    path: 'trip',
    children: [
      {
        path: ':id',
        component: TableTripComponent,
        data: {
          title: 'YourDriver',
          urls: [
            { title: 'Profile', url: '/profile' },
            { title: 'Driver profile' }
          ]
        }
      }
    ]
  },
  {
    path: 'pendingdriverprofile',
    children: [
      {
        path: ':id',
        component: PendingDriverComponent,
        data: {
          title: 'YourDriver',
          urls: [
            { title: 'Profile', url: '/profile' },
            { title: 'Driver profile' }
          ]
        }
      }
    ]
  },
  {
    path: 'profilecanceltrip',
    children: [
      {
        path: ':id',
        component: ProfileCancelTripComponent,
        data: {
          title: 'YourDriver',
          urls: [
            { title: 'Profile', url: '/profile' },
            { title: 'Driver profile' }
          ]
        }
      }
    ]
  },
  {
    path: 'profileusercanceltrip',
    children: [
      {
        path: ':id',
        component: ProfileCancelTripComponent,
        data: {
          title: 'YourDriver',
          urls: [
            { title: 'Profile', url: '/profile' },
            { title: 'Driver profile' }
          ]
        }
      }
    ]
  }
]

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
export class ProfileRoutingModule { }
