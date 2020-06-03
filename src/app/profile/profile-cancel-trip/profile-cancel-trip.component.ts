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
  isCancelByDriver: Boolean = false

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
      if (data[0].path === 'profilecanceltrip') {
        this.drivercancelTrip()
        this.isCancelByDriver = true
      } else {
        this.usercancelTrip()
        this.isCancelByDriver = false
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

  //Cuando el conductor cancela el viaje
  moveToHistoryTripApprovedByDriver() {
    const infoPayment = {
      payment_id: this.tripCancel.payment_Id
    }
    this.squareService.completePayment(infoPayment).subscribe(data => {
      if (data.status == 'COMPLETED') {
        const finalTrip = {
          dateStart: this.tripCancel.dateStart,
          destinationAddress: this.tripCancel.destinationAddress,
          destinationCoordinatesLatitude: this.tripCancel.destinationCoordinatesLatitude,
          destinationCoordinatesLongitude: this.tripCancel.destinationCoordinatesLongitude,
          destinationName: this.tripCancel.destinationName,
          distanceInMeter: this.tripCancel.distanceInMeter,
          driverName: this.tripCancel.driverName,
          driverPicture: this.tripCancel.driverPicture,
          driverUid: this.tripCancel.driverUid,
          expectTimeTravel: this.tripCancel.expectTimeTravel,
          passengerName: this.tripCancel.passengerName,
          passengerPicture: this.tripCancel.passengerPicture,
          passengerUid: this.tripCancel.passengerUid,
          paymentStatus: data.status,
          payment_Id: this.tripCancel.payment_Id,
          pickupCoordinatesLatitude: this.tripCancel.pickupCoordinatesLatitude,
          pickupCoordinatesLongitude: this.tripCancel.pickupCoordinatesLongitude,
          priceTrip: this.tripCancel.priceTrip,
          reason: this.tripCancel.reason,
          tripStatus: this.tripCancel.tripStatus
        }
        this.userService.postHistoryTrip(this.uid, finalTrip).then(() => {
          this.userService.deleteTripCanceledDriver(this.uid).then(() => {
            this.router.navigate(['/tables/canceltriptable']) 
          }).catch(e => console.log('Ocurrio un error borrando'))
        }).catch(e => console.log('error en crear post'))
      }else {
        alert('servicio respondio diferente de completed')
      }
    }, error => {
      alert(`error : ${error.error.errorMessage}`)
    })
  }

  moveToHistoryTripCancelledByDriver() {
    const infoPayment = {
      payment_id: this.tripCancel.payment_Id
    }
    this.squareService.completePaymentDenied(infoPayment).subscribe(data => {
      if (data.status == 'CANCELED') {
        const finalTrip = {
          dateStart: this.tripCancel.dateStart,
          destinationAddress: this.tripCancel.destinationAddress,
          destinationCoordinatesLatitude: this.tripCancel.destinationCoordinatesLatitude,
          destinationCoordinatesLongitude: this.tripCancel.destinationCoordinatesLongitude,
          destinationName: this.tripCancel.destinationName,
          distanceInMeter: this.tripCancel.distanceInMeter,
          driverName: this.tripCancel.driverName,
          driverPicture: this.tripCancel.driverPicture,
          driverUid: this.tripCancel.driverUid,
          expectTimeTravel: this.tripCancel.expectTimeTravel,
          passengerName: this.tripCancel.passengerName,
          passengerPicture: this.tripCancel.passengerPicture,
          passengerUid: this.tripCancel.passengerUid,
          paymentStatus: data.status,
          payment_Id: this.tripCancel.payment_Id,
          pickupCoordinatesLatitude: this.tripCancel.pickupCoordinatesLatitude,
          pickupCoordinatesLongitude: this.tripCancel.pickupCoordinatesLongitude,
          priceTrip: 0,
          reason: this.tripCancel.reason,
          tripStatus: 6,
        }
        this.userService.postHistoryTrip(this.uid, finalTrip).then(() => {
          this.userService.deleteTripCanceledDriver(this.uid).then(() => {
            this.router.navigate(['/tables/canceltriptable']) 
          }).catch(e => console.log('Ocurrio un error borrando'))
        }).catch(e => console.log('error en crear post'))
      }else {
        alert('servicio respondio diferente de canceled')
      }
    }, error => {
      alert(`error : ${error.error.errorMessage}`)
    })
  }

  //Cuando el usuario cancela el viaje
  moveToHistoryTripApprovedByPassenger() {
    const infoPayment = {
      payment_id: this.tripCancel.payment_Id_Cancel
    }
    this.squareService.completePayment(infoPayment).subscribe(data => {
      if (data.status == 'COMPLETED') {
        const finalTrip = {
          dateStart: this.tripCancel.dateStart,
          destinationAddress: this.tripCancel.destinationAddress,
          destinationCoordinatesLatitude: this.tripCancel.destinationCoordinatesLatitude,
          destinationCoordinatesLongitude: this.tripCancel.destinationCoordinatesLongitude,
          destinationName: this.tripCancel.destinationName,
          distanceInMeter: this.tripCancel.distanceInMeter,
          driverName: this.tripCancel.driverName,
          driverPicture: this.tripCancel.driverPicture,
          driverUid: this.tripCancel.driverUid,
          expectTimeTravel: this.tripCancel.expectTimeTravel,
          passengerName: this.tripCancel.passengerName,
          passengerPicture: this.tripCancel.passengerPicture,
          passengerUid: this.tripCancel.passengerUid,
          paymentStatus: this.tripCancel.paymentStatus,
          paymentStatusCancel: data.status,
          payment_Id: this.tripCancel.payment_Id,
          payment_Id_Cancel: this.tripCancel.payment_Id_Cancel,
          pickupCoordinatesLatitude: this.tripCancel.pickupCoordinatesLatitude,
          pickupCoordinatesLongitude: this.tripCancel.pickupCoordinatesLongitude,
          priceCancelFee:this.tripCancel.priceCancelFee,
          priceTrip: 5.30,
          reason: this.tripCancel.reason,
          tripStatus: this.tripCancel.tripStatus
        }
        this.userService.postHistoryTrip(this.uid,finalTrip).then(()=> {
          this.userService.deleteTripsCanceledUser(this.uid).then(()=> {
            this.router.navigate(['/tables/cancelusertriptable']) 
          }).catch(e => console.log('Ocurrio un error borrando'))
        }).catch(e => console.log('error en crear post'))
      }else {
        alert('servicio respondio diferente de COMPLETED')
      }
    }, error => {
      alert(`error : ${error.error.errorMessage}`)
    })
  }

  moveToHistoryTripCancelledByPassenger() {
    const infoPayment = {
      payment_id: this.tripCancel.payment_Id_Cancel
    }
    this.squareService.completePaymentDenied(infoPayment).subscribe(data => {
      if (data.status == 'CANCELED') {
        const finalTrip = {
          dateStart: this.tripCancel.dateStart,
          destinationAddress: this.tripCancel.destinationAddress,
          destinationCoordinatesLatitude: this.tripCancel.destinationCoordinatesLatitude,
          destinationCoordinatesLongitude: this.tripCancel.destinationCoordinatesLongitude,
          destinationName: this.tripCancel.destinationName,
          distanceInMeter: this.tripCancel.distanceInMeter,
          driverName: this.tripCancel.driverName,
          driverPicture: this.tripCancel.driverPicture,
          driverUid: this.tripCancel.driverUid,
          expectTimeTravel: this.tripCancel.expectTimeTravel,
          passengerName: this.tripCancel.passengerName,
          passengerPicture: this.tripCancel.passengerPicture,
          passengerUid: this.tripCancel.passengerUid,
          paymentStatus: this.tripCancel.paymentStatus,
          paymentStatusCancel: data.status,
          payment_Id: this.tripCancel.payment_Id,
          payment_Id_Cancel: this.tripCancel.payment_Id_Cancel,
          pickupCoordinatesLatitude: this.tripCancel.pickupCoordinatesLatitude,
          pickupCoordinatesLongitude: this.tripCancel.pickupCoordinatesLongitude,
          priceCancelFee:this.tripCancel.priceCancelFee,
          priceTrip: 0,
          reason: this.tripCancel.reason,
          tripStatus: 6,
        }
        this.userService.postHistoryTrip(this.uid,finalTrip).then(()=> {
          this.userService.deleteTripsCanceledUser(this.uid).then(()=> {
            this.router.navigate(['/tables/cancelusertriptable']) 
          }).catch(e => console.log('Ocurrio un error borrando'))
        }).catch(e => console.log('error en crear post'))
      }else {
        alert('servicio respondio diferente de CANCELED')
        console.log(data);
      }
    }, error => {
      alert(`error : ${error.error.errorMessage}`)
    })
  }

}