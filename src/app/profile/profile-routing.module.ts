import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableUserComponent } from './table-user/table-user.component';


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
  }
]

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
export class ProfileRoutingModule { }
