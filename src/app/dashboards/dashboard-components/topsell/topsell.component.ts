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

  trips: Trip[]
  tripAndDrivers: any[] = [];

  driver: any = 0
  user: any = 0

  passengerSet: User
  driverSet: Drivers;

  isPassenger: Boolean

  constructor(private userService: UserService,
    private tripService: TripService) { }

  ngOnInit() {
    this.tripService.getAllTripsLive().snapshotChanges().pipe(map(data => {
      return data.map(e => ({ key: e.key, ...e.payload.val() }))
    })).subscribe(data => {
      this.tripAndDrivers = data
    })
    // this.tripService.getAllTripsLive().valueChanges().subscribe(data => {
    //   data.forEach(trip => {
    //     if(trip.state !== 0){
    //       this.userService.getDriverById(trip.driverUid).valueChanges().subscribe(driver => {
    //         this.userService.getUserById(trip.passengerUid).valueChanges().subscribe(passenger => {
    //           this.tripAndDrivers.push(({...trip, driverInfo: driver, passengerInfo: passenger}))
    //         })
    //       })
    //     }
    //   })
    // })
  }

  setPassenger(uid) {
    this.isPassenger = true
    console.log('entramos a la funcion de editar passenger');
    this.userService.getUserById(uid).valueChanges().subscribe(data => {
      this.passengerSet = data
      console.log(this.passengerSet);
    })
  }

  setDriver(uid) {
    this.isPassenger = false
    this.userService.getDriverById(uid).valueChanges().subscribe(data => {
      this.driverSet = data
    })
  }


}



