import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as c3 from 'c3';
import { UserService } from 'src/app/core/services/user/user.service';
import 'firebase/database';
import { Drivers, User, Trip } from 'src/app/interface/user.interface';
import { PriceService } from 'src/app/core/services/price-value/price.service';
import { StatusDriverService } from 'src/app/core/services/status-driver/status-driver.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfocardComponent implements OnInit, AfterViewInit {

  drivers: Drivers[]
  driversPending: number
  driversActives: number

  users: User[]
  totalUsers: number

  trips: Trip[]
  totalTrips: number

  totalPrice: number = 0
  driversAvaible: number = 0;
  driversBusy: number = 0;



  constructor(private userService: UserService,
            private priceService: PriceService,
            private statusService: StatusDriverService) { }

  ngOnInit() {
    this.userService.getDriversPending().valueChanges().subscribe(data => {
      this.drivers = data
      this.driversPending = this.drivers.filter(ref => ref.state === 1).length
      this.driversActives = this.drivers.filter(ref => ref.state === 2 || ref.state === 3).length
    })

    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.totalUsers = this.users.length
    })


    this.userService.getTrips().valueChanges().subscribe(data => {
      this.trips = data
      this.totalTrips = this.trips.length
    })

    this.priceService.getPriceValue().subscribe(data => {
      this.totalPrice = data.totalPayments
    })

    this.statusService.getDriveStatus().valueChanges().subscribe(data =>{
      this.driversAvaible = data.Available.Total
      this.driversBusy = data.Busy.Total
      console.log(data);
    })

    // this.statusService.getDriversLocationsBusy().subscribe(data =>{
    //   this.driversBusy = data.length
    // })
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
  }
}
