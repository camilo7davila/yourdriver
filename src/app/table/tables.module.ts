import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { TablesRoutes } from './tables.routing';
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

@NgModule({
  imports: [
    RouterModule.forChild(TablesRoutes),
    CommonModule, 
    NgxDatatableModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    DatatableComponent,
    BasictableComponent,
    DarktableComponent,
    ColortableComponent,
    TablesizeComponent,
    SmarttableComponent,
    UserTableComponent,
    DriverTableComponent,
    TripsTableComponent,
    PendingDriverTableComponent,
    ]
})
export class TablesModule {}
