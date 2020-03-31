import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableUserComponent } from './table-user/table-user.component';
import { TableDriverComponent } from './table-driver/table-driver.component';


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
  }
]

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
export class ProfileRoutingModule { }
