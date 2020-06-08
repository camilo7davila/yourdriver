import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import { UserService } from 'src/app/core/services/user/user.service';
import 'firebase/database';
import { Drivers, User, Trip } from 'src/app/interface/user.interface';
import { PriceService } from 'src/app/core/services/price-value/price.service';
import { TripService } from 'src/app/core/services/trip/trip.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfocardComponent implements OnInit {

  drivers: Drivers[]
  driversPending: number
  driversActives: number

  users: User[]
  totalUsers: number

  trips: Trip[]
  totalTrips: number

  totalPrice: number = 0
  driversAvaible: number = 0;
  // driversBusy: number = 0;
  tripsCancelByDriver: number = 0
  tripsCancelByUser: number = 0



  constructor(private userService: UserService,
            private priceService: PriceService,
            private tripService: TripService) { }

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

    this.tripService.getTripsCancel().valueChanges().subscribe(data => {
      this.tripsCancelByDriver = data.length
    })

    this.tripService.getTripsCancelUser().valueChanges().subscribe(data => {
      this.tripsCancelByUser = data.length
    })

    // this.statusService.getDriveStatus().valueChanges().subscribe(data =>{
    //   this.driversAvaible = data.Available.Total
    //   this.driversBusy = data.Busy.Total
    //   console.log(data);
    // })

    // this.statusService.getDriversLocationsBusy().subscribe(data =>{
    //   this.driversBusy = data.length
    // })
  }

  
}
