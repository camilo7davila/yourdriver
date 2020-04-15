import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { map } from 'rxjs/operators';
import { Trip } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-trips-table',
  templateUrl: './trips-table.component.html',
  styleUrls: ['./trips-table.component.css']
})
export class TripsTableComponent implements OnInit {

  trips: Trip[]
  tripsPassengerDriver: any[] = []

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getTrips().snapshotChanges().pipe(map(changes => {
      return changes.map(data => ({key: data.key, ...data.payload.val()}))
    })).subscribe(trips => {
      trips.map(trip => {
        this.userService.getDriverById(trip.driverUid).valueChanges().subscribe(dataDriver => {
          this.userService.getUserById(trip.passengerUid).valueChanges().subscribe(dataPassenger => {
            this.tripsPassengerDriver.push(({...trip, driverData: dataDriver, passengerData: dataPassenger}))
          })
        })
      })
      console.log(this.tripsPassengerDriver);
    })
  }
}