import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { TableUserComponent } from './table-user/table-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableDriverComponent } from './table-driver/table-driver.component';
import { TableTripComponent } from './table-trip/table-trip.component';
import { PendingDriverComponent } from './pending-driver/pending-driver.component';
import { ProfileCancelTripComponent } from './profile-cancel-trip/profile-cancel-trip.component';


@NgModule({
  declarations: [TableUserComponent, TableDriverComponent, TableTripComponent, PendingDriverComponent, ProfileCancelTripComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule
  ],
})
export class ProfileModule { }
