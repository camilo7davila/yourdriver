import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { Trip, User, Drivers } from 'src/app/interface/user.interface';
import { map } from 'rxjs/operators';
import { TripService } from 'src/app/core/services/trip/trip.service';

@Component({
  selector: 'app-topsell',
  templateUrl: './topsell.component.html',
  styleUrls: ['./topsell.component.scss']
})
export class TopsellComponent implements OnInit {

  tripAndDrivers: any[] = [];
  passengerSet: User
  driverSet: Drivers;

  constructor(private userService: UserService,
    private tripService: TripService) { }

  ngOnInit() {
    this.tripService.getAllTripsLive().snapshotChanges().pipe(map(data => {
      return data.map(e => ({ key: e.key, ...e.payload.val() }))
    })).subscribe(data => {
      this.tripAndDrivers = data
    })
  }

  setTrip(trip) {
    this.setPassenger(trip.passengerUid)
    this.setDriver(trip.driverUid)
  }

  setPassenger(uid) {
    this.userService.getUserById(uid).valueChanges().subscribe(data => {
      this.passengerSet = data
    })
  }

  setDriver(uid) {
    this.userService.getDriverById(uid).valueChanges().subscribe(data => {
      this.driverSet = data
    })
  }


}