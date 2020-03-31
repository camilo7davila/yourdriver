import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Drivers, User, Trip } from 'src/app/interface/user.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularDB: AngularFireDatabase) {  }

  getid(): Observable<any>{
    return this.angularDB.list<Drivers>('/Drivers').snapshotChanges().pipe(map(changes => {
      return changes.map(a => ({key: a.payload.key, ...a.payload.val() }))
    }))
  }

  getDriversPending(){
    // query que devuelve los ids de los conductores que tienen state 1
    // return this.angularDB.list('/Drivers', ref => ref.orderByChild('state').equalTo(1)).snapshotChanges()
    return this.angularDB.list<Drivers>('/Drivers').valueChanges()
  }

  getDriversWhitId(){
    return this.angularDB.list<Drivers>('/Drivers')
  }

  getDriversAvailable(){
    return this.angularDB.list('/Drivers-Locations-Available')
  }

  getUsers(){
    return this.angularDB.list<User>('/Users').snapshotChanges().pipe(map(changes => {
      return changes.map(a => ({key: a.payload.key, ...a.payload.val() }))
    }))
  }

  getTrips(){
    return this.angularDB.list<Trip>('/Trips-History')
  }

  getDriverById(id){
    return this.angularDB.object<Drivers>('/Drivers/' + id)
  }
  getUserById(id){
    return this.angularDB.object<User>('/Users/' + id)
  }

  searchTripForPassenger(idPassenger){
    return this.angularDB.list<Trip>('/Trips-History', ref => ref.orderByChild('passengerUid').equalTo(idPassenger))
  }

  searchTripForDriver(idPassenger){
    return this.angularDB.list<Trip>('/Trips-History', ref => ref.orderByChild('driverUid').equalTo(idPassenger))
  }

  editUser(id, user){
    return this.angularDB.object('/Users/' + id).update(user)
  }
  editDriver(id, driver){
    return this.angularDB.object('/Drivers/' + id).update(driver)
  }
}
