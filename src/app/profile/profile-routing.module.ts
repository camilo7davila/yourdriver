import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableUserComponent } from './table-user/table-user.component';


const routes: Routes = [
  {
    path:'userprofile/:id',
    component: TableUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
