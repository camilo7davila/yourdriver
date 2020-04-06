import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { TripService } from 'src/app/core/services/trip/trip.service';
import 'firebase/database';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TripLive } from 'src/app/interface/trip-live.interface';


@Component({
  selector: 'app-map-trip',
  templateUrl: './map-trip.component.html',
  styleUrls: ['./map-trip.component.css']
})
export class MapTripComponent implements OnInit {

  @ViewChild('map1', { static: true }) map1;

  tripId: string
  allTrip: TripLive

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private tripService: TripService) { }

  ngOnInit() {
    this.route.params.subscribe(url => {
      this.tripId = url.id
      this.getTrip(url.id)
    })
  }

  getTrip(id){
    this.tripService.getTripById(id).valueChanges().subscribe(data => {
      let passenger$ = this.getPassenger(id)
      let driver$ = this.getDriver(data.driverUid)
      combineLatest([passenger$ , driver$]).pipe(
        map(([passenger, driver ]) =>  (({passengerInfo: passenger, driverInfo:driver, ...data})))
      ).subscribe(final => {
        this.allTrip = final
        console.log(final);
      })
    })
  }

  getPassenger(idPassenger){
    return this.userService.getUserById(idPassenger).valueChanges()
  }

  getDriver(idDriver){
    return this.userService.getDriverById(idDriver).valueChanges()
  }

}
