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
          this.tripsPassengerDriver.push(({...trip, driverData: dataDriver}))
          // this.userService.getUserById(trip.passengerUid).valueChanges().subscribe(dataPassenger => {
          // })
        })
      })
    })
    this.search()
  }

  search(){
    console.log(this.tripsPassengerDriver);
    console.log('Esto es el largo del arreglo',this.tripsPassengerDriver);
    
    // let arrayPrueba = [{priceTrip : 20,otrodata: "camila"},{priceTrip : 9, otrodata: "camila"}]
    // console.log(arrayPrueba);
    // console.log(this.tripsPassengerDriver);
    // this.tripsPassengerDriver.forEach(data => {
    //   console.log('Esto es data => ' , data);
    // })
    // let arrayFilter = this.tripsPassengerDriver.filter(key => {
    //   return key.priceTrip <= 10;
    // })
    // console.log('este es el filtro ===> ', arrayFilter);
  }

}
