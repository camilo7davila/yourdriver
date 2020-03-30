import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileRoutingModule } from './profile-routing.module';
import { TableUserComponent } from './table-user/table-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableDriverComponent } from './table-driver/table-driver.component';


@NgModule({
  declarations: [TableUserComponent, TableDriverComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProfileModule { }
