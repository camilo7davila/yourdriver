import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { Trip } from 'src/app/interface/user.interface';
import { TripService } from 'src/app/core/services/trip/trip.service';
import 'firebase/database';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trips-cancel-table',
  templateUrl: './trips-cancel-table.component.html',
  styleUrls: ['./trips-cancel-table.component.css']
})
export class TripsCancelTableComponent implements OnInit {

  tripCancel: Trip[]
  tripComplete: any[] = []
  isDriver: Boolean

  constructor(private tripService: TripService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(data => {
      if(data[0].path === 'canceltriptable') {
        this.isDriver = true
        this.tripsCancelDriver()
      } else {
        this.isDriver = false
        this.tripsCancelUser()
      }
    })
  }

  tripsCancelUser() {
    this.tripService.getTripsCancelUser().snapshotChanges().pipe(map(change => {
      return change.map(e => ({ key: e.key, ...e.payload.val() }))
    })).subscribe(data => {
      this.tripCancel = data
      data.forEach(trip => {
        this.getUserById(trip)
      })
    })
  }

  tripsCancelDriver() {
    this.tripService.getTripsCancel().snapshotChanges().pipe(map(change => {
      return change.map(e => ({ key: e.key, ...e.payload.val() }))
    })).subscribe(data => {
      this.tripCancel = data
      data.forEach(trip => {
        this.getUserById(trip)
      })
    })
  }
  
  getUserById(trip) {
    this.userService.getUserById(trip.passengerUid).valueChanges().subscribe(passenger => {
      this.getDriverById(trip, passenger)
    })
  }

  getDriverById(trip, passenger) {
    this.userService.getDriverById(trip.driverUid).valueChanges().subscribe(driver => {
      this.tripComplete.push({ ...trip, passengerInfo: passenger , driverInfo: driver})
    })
  }

}
