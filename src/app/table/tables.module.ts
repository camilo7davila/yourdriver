import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { TablesRoutes } from './tables.routing';
import { UserTableComponent } from './user-table/user-table.component';
import { DriverTableComponent } from './driver-table/driver-table.component';
import { TripsTableComponent } from './trips-table/trips-table.component';
import { PendingDriverTableComponent } from './pending-driver-table/pending-driver-table.component';
import { TripsCancelTableComponent } from './trips-cancel-table/trips-cancel-table.component';

@NgModule({
  imports: [
    RouterModule.forChild(TablesRoutes),
    CommonModule, 
    NgxDatatableModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    UserTableComponent,
    DriverTableComponent,
    TripsTableComponent,
    PendingDriverTableComponent,
    TripsCancelTableComponent,
    ]
})
export class TablesModule {}
