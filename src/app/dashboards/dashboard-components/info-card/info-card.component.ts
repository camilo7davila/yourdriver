import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as c3 from 'c3';
import { UserService } from 'src/app/core/services/user/user.service';
import 'firebase/database';
import { Drivers, User, Trip } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html'
})
export class InfocardComponent implements OnInit, AfterViewInit {

  drivers: Drivers[]
  driversPending: number
  driversActives: number

  users: User[]
  totalUsers: number

  driversAvailable: any

  trips: Trip[]
  totalTrips: number


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getDriversPending().subscribe(data => {
      this.drivers = data
      this.driversPending = this.drivers.filter(ref => ref.state === 1).length
      this.driversActives = this.drivers.filter(ref => ref.state === 2 || ref.state === 3).length
    })

    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.totalUsers = this.users.length
    })

    this.userService.getDriversAvailable().snapshotChanges().subscribe(data => {
      this.driversAvailable = data.length
    })

    this.userService.getTrips().valueChanges().subscribe(data => {
      this.trips = data
      this.totalTrips = this.trips.length
    })
  }

  public lineChartData: Array<any> = [
    { data: [12, 19, 3, 5, 2, 3], label: 'Balance $' }
  ];
  public lineChartLabels: Array<any> = [
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017'
  ];
  public lineChartOptions: any = {
    responsive: true,
    elements: {
      point: {
        radius: 2
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: false
          }
        }
      ]
    }
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: '#4dc8ff',
      pointBackgroundColor: '#4dc8ff',
      pointBorderColor: '#4dc8ff',
      pointHoverBackgroundColor: '#4dc8ff',
      pointHoverBorderColor: '#4dc8ff'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  ngAfterViewInit() {
    // (<any>$('#ravenue')).sparkline([6, 10, 9, 11, 9, 10, 12], {
    //   type: 'bar',
    //   height: '55',
    //   barWidth: '4',
    //   width: '100%',
    //   resize: true,
    //   barSpacing: '8',
    //   barColor: '#2961ff'
    // });

    // const chart = c3.generate({
    //   bindto: '#foo',
    //   data: {
    //     columns: [['data', 91.4]],
    //     type: 'gauge'
    //   },
    //   gauge: {
    //     label: {
    //       format: function(value, ratio) {
    //         return value;
    //       },
    //       show: false
    //     },
    //     min: 0,
    //     max: 100,
    //     units: ' %',
    //     width: 15
    //   },
    //   legend: {
    //     hide: true
    //   },
    //   size: {
    //     height: 80
    //   },
    //   color: {
    //     pattern: ['#7e74fb']
    //   }
    // });
  }
}
