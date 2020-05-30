import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Trip, User, Drivers } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/core/services/user/user.service';
import { TripService } from 'src/app/core/services/trip/trip.service';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import 'firebase/database';
import { SquareService } from 'src/app/core/services/square/square.service';

@Component({
  selector: 'app-profile-cancel-trip',
  templateUrl: './profile-cancel-trip.component.html',
  styleUrls: ['./profile-cancel-trip.component.css']
})
export class ProfileCancelTripComponent implements OnInit {

  tripCancel: Trip
  passenger: User
  driver: Drivers
  uid: string = ''

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
    private userService: UserService,
    private squareService: SquareService,
    private router: Router) { }

  ngOnInit() {
    this.route.parent.url.subscribe(data => {
      console.log(data);
      if (data[0].path === 'profilecanceltrip') {
        this.drivercancelTrip()
      } else {
        this.usercancelTrip()
      }
    })
  }

  usercancelTrip() {
    this.route.params.pipe(switchMap((params: Params) => {
      this.uid = params.id
      return this.tripService.getTripsCancelUserById(params.id).valueChanges()
    })).subscribe(data => {
      let passsenger$ = this.userService.getUserById(data.passengerUid).valueChanges()
      let driver$ = this.userService.getDriverById(data.driverUid).valueChanges()
      combineLatest([passsenger$, driver$]).pipe(
        map(([passenger, driver]) => (({ passengerInfo: passenger, driverInfo: driver, tripInfo: data })))
      ).subscribe(final => {
        this.tripCancel = final.tripInfo,
          this.passenger = final.passengerInfo,
          this.driver = final.driverInfo
      })
    })
  }

  drivercancelTrip() {
    this.route.params.pipe(switchMap((params: Params) => {
      this.uid = params.id
      return this.tripService.getTripsCancelById(params.id).valueChanges()
    })).subscribe(data => {
      let passsenger$ = this.userService.getUserById(data.passengerUid).valueChanges()
      let driver$ = this.userService.getDriverById(data.driverUid).valueChanges()
      combineLatest([passsenger$, driver$]).pipe(
        map(([passenger, driver]) => (({ passengerInfo: passenger, driverInfo: driver, tripInfo: data })))
      ).subscribe(final => {
        this.tripCancel = final.tripInfo,
          this.passenger = final.passengerInfo,
          this.driver = final.driverInfo
      })
    })
  }

  moveToHistoryTrip() {
    const infoPayment = {
      payment_id: this.tripCancel.payment_Id_Cancel
    }
    this.squareService.completePayment(infoPayment).subscribe(data => {
      console.log(data);
      if (data.status == 'COMPLETED') {
        const finalTrip = {
          dateStart: this.tripCancel.dateStart,
          destinationAddress: this.tripCancel.destinationAddress,
          destinationCoordinatesLatitude: this.tripCancel.destinationCoordinatesLatitude,
          destinationCoordinatesLongitude: this.tripCancel.destinationCoordinatesLongitude,
          destinationName: this.tripCancel.destinationName,
          distanceInMeter: this.tripCancel.distanceInMeter,
          driverUid: this.tripCancel.driverUid,
          expectTimeTravel: this.tripCancel.expectTimeTravel,
          passengerUid: this.tripCancel.passengerUid,
          paymentStatus: this.tripCancel.paymentStatus,
          paymentStatusCancel: data.status,
          payment_Id: this.tripCancel.payment_Id,
          payment_Id_Cancel: this.tripCancel.payment_Id_Cancel,
          pickupCoordinatesLatitude: this.tripCancel.pickupCoordinatesLatitude,
          pickupCoordinatesLongitude: this.tripCancel.pickupCoordinatesLongitude,
          priceCancelFee: this.tripCancel.priceCancelFee,
          priceTrip: this.tripCancel.priceTrip,
          reason: this.tripCancel.reason,
          tripState: this.tripCancel.tripState
        }
        this.userService.postHistoryTrip(this.uid, finalTrip).then(() => {
          this.userService.deleteTripsCanceledUser(this.uid).then(() => {
            this.router.navigate(['/tables/cancelusertriptable']) 
          }).catch(e => console.log('Ocurrio un error borrando'))
        }).catch(e => console.log('error en crear post'))
      }
    }, error => {
      console.log('error', error.errorMessage);
    })
  }

  removeFromTripsCanceled() {

    this.userService.deleteTripsCanceledUser(this.uid).then(() => {
      alert('todo correcto')
    }).catch(e => console.log('Ocurrio un error borrando'))
  }

}