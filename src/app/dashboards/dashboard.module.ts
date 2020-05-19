import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CalendarModule } from 'angular-calendar';

import { DashboardRoutes } from './dashboard.routing';

import { Dashboard1Component } from './dashboard1/dashboard1.component';

import {
  InfocardComponent,
  TopsellComponent,
  SalesIncomeComponent,
} from './dashboard-components';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ChartsModule,
    RouterModule.forChild(DashboardRoutes),
    PerfectScrollbarModule,
    CalendarModule.forRoot(),
    NgxChartsModule,
    NgxDatatableModule
  ],
  declarations: [
    Dashboard1Component,
    InfocardComponent,
    TopsellComponent,
    SalesIncomeComponent,
  ]
})
export class DashboardModule {}
