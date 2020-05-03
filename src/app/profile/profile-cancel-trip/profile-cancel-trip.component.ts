import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Trip, User, Drivers } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/core/services/user/user.service';
import { TripService } from 'src/app/core/services/trip/trip.service';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import 'firebase/database';

@Component({
  selector: 'app-profile-cancel-trip',
  templateUrl: './profile-cancel-trip.component.html',
  styleUrls: ['./profile-cancel-trip.component.css']
})
export class ProfileCancelTripComponent implements OnInit {

  tripCancel: Trip
  passenger: User
  driver: Drivers

  iconOrigin = {
    url: '../../../assets/map/driver.png',
    scaledSize: { width: 25, height: 30 }
  }

  iconDest = {
    url: '../../../assets/map/dest.png',
    scaledSize: { width: 25, height: 30 }
  }

  constructor(private tripService: TripService,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.tripService.getTripsCancelById(params.id).valueChanges()
    })).subscribe(data => {
      let passsenger$ = this.userService.getUserById(data.passengerUid).valueChanges()
      let driver$ = this.userService.getDriverById(data.driverUid).valueChanges()
      combineLatest([passsenger$, driver$]).pipe(
        map(([passenger,driver]) => (({passengerInfo: passenger, driverInfo:driver, tripInfo:data})))
      ).subscribe(final => {
        console.log('esto es final ====>' + final);
        this.tripCancel = final.tripInfo,
        this.passenger = final.passengerInfo,
        this.driver = final.driverInfo
      })
    })
  }

}
