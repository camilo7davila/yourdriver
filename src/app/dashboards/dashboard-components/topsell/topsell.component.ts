import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { Trip } from 'src/app/interface/user.interface';
import { map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-topsell',
  templateUrl: './topsell.component.html'
})
export class TopsellComponent implements OnInit {

  trips: Trip[]

  tripAndDrivers:any = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getTrips().valueChanges().subscribe(trips => {
      trips.map(trips =>{
        this.userService.getDriverById(trips.driverUid).valueChanges().subscribe(data => {
          this.userService.getUserById(trips.passengerUid).valueChanges().subscribe(userInfo => {
            this.tripAndDrivers.push(({...trips, driverInfo: data, passengerInfo: userInfo}))
          })
        })
      })
    });
  }


  // getAllDrivers(allTrips: Trip[]) {
  //   allTrips.forEach(trip => this.getDriverID(trip.driverUid).subscribe(driver => {
  //     this.tripAndDrivers.push(({...trip, driver: driver}))
  //     console.log(({...trip, driver: driver}));
  //   }))
  // }

  // getDriverID(id){
  //   this.userService.getDriverById(id).valueChanges()
  // }

  //   this.userService.getid().subscribe(data => {
  //   console.log('estos son los que tienen id ======> ', data);
  // })
  // }

}



