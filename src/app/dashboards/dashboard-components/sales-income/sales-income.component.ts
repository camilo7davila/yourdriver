import { Component, OnInit, ViewChild } from '@angular/core';
import * as c3 from 'c3';
import { UserService } from 'src/app/core/services/user/user.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatusDriverService } from 'src/app/core/services/status-driver/status-driver.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-sales-income',
  templateUrl: './sales-income.component.html'
})
export class SalesIncomeComponent implements OnInit {

  // @ViewChild('canvas', {static: true}) canvas: any

  pending: number = 0
  approved: number = 0
  rejected: number = 0

  driversAvailable: number = 0
  driversBusy: number = 0

  //DONA------------------------------------------------------------->
  public doughnutChartLabels: string[] = [
    'Pending',
    'Approved',
    'rejected',
  ];

  public doughnutChartData: number[] = [0];
  public doughnutChartType: ChartType = 'doughnut';

  //BARRAS --------------------------------------------------------------->
  public barChartOptions: ChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 10,
    scales: { xAxes: [{}], yAxes: [{ ticks: { beginAtZero: true } }] },
  };

  public barChartLabels: string[] = [
    'Available',
    'Busy'
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [0,0], label: 'otros' }
  ];
  public barChartColors: Array<any> = [
    { backgroundColor: '#36bea6' },
    { backgroundColor: '#2962FF' }
  ];

  constructor(private userService: UserService,
    private statusService: StatusDriverService) { }

  ngOnInit() {
    this.driversStatus()
    this.userService.getDriversPending().snapshotChanges().pipe(map(changes => {
      return changes.map(a => ({ key: a.key, ...a.payload.val() }))
    })).subscribe(data => {
      this.pending = data.filter(data => data.state === 1).length
      this.approved = data.filter(data => data.state === 2).length
      this.rejected = data.filter(data => data.state === 3).length
      this.pushDonut(this.pending, this.approved, this.rejected)
    })
  }

  driversStatus() {
    let driverAvailable$ = this.statusService.getDriversLocationsAvailable()
    let driverBusy$ = this.statusService.getDriversLocationsBusy()
    combineLatest([driverAvailable$, driverBusy$]).pipe(
      map(([driverAvailable, driverBusy]) => ({ driverAvailable, driverBusy }))
    ).subscribe(final => {
      this.driversAvailable = final.driverAvailable.length
      this.driversBusy = final.driverBusy.length
      this.barChartData = [({ data: [this.driversAvailable, this.driversBusy], label: 'Drivers', backgroundColor: "rgba(255,99,132,0.6)", borderColor: "rgba(255,99,132,1)", hoverBackgroundColor: "rgba(255,99,132,0.8)", hoverBorderColor: "rgba(255,99,132,1)" })]
    })
  }


  pushDonut(pending, aproved, rejected) {
    this.doughnutChartData = [pending, aproved, rejected]
  }

}
