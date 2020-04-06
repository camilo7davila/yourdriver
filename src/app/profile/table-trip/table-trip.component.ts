import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
 
@Component({
  selector: 'app-table-trip',
  templateUrl: './table-trip.component.html',
  styleUrls: ['./table-trip.component.css']
})
export class TableTripComponent implements OnInit {

  @ViewChild('map1', { static: true }) map1;

  tripId: String
  tripAll: any

  constructor(private userService: UserService,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tripId = params.id
      this.getTrip(params.id)
    })
  }

  getTrip(idTrip) {
    this.userService.getTripById(idTrip).valueChanges().subscribe(viaje => {
      let passsenger$ = this.getPassenger(viaje.passengerUid)
      let driver$ = this.getDriver(viaje.driverUid)
      combineLatest([passsenger$, driver$]).pipe(
        map(([passsenger, driver]) => (({passengerInfo: passsenger, driverInfo:driver, tripInfo:viaje})))
      ).subscribe(final => {
        this.tripAll = final
        console.log(this.tripAll);
      })
    })
  } 

  getPassenger(id){
    return this.userService.getUserById(id).valueChanges()
  }

  getDriver(id){
    return this.userService.getDriverById(id).valueChanges()
  }

}
