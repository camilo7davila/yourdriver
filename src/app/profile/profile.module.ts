import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileRoutingModule } from './profile-routing.module';
import { TableUserComponent } from './table-user/table-user.component';


@NgModule({
  declarations: [TableUserComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgbModule
  ]
})
export class ProfileModule { }
