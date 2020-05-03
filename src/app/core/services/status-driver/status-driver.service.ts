import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { StatusDriver } from 'src/app/interface/trip-live.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusDriverService {

  constructor(private angularDB: AngularFireDatabase) { } 

  getDriversLocationsAvailable(){
    return this.angularDB.list<StatusDriver>('Drivers-Locations-Available').snapshotChanges().pipe(map(changes => {
      return changes.map(a => ({key: a.key, ...a.payload.val()}))
    }))
  }

  getDriversLocationsBusy(){
    return this.angularDB.list<StatusDriver>('Drivers-Locations-Busy').snapshotChanges().pipe(map(changes => {
      return changes.map(a => ({key: a.key, ...a.payload.val()}))
    }))
  }

  getDriversLocationsinTrip(){
    return this.angularDB.list<StatusDriver>('Drivers-Locations-InTrip').snapshotChanges().pipe(map(changes => {
      return changes.map(a => ({key: a.key, ...a.payload.val()}))
    }))
  }
}
