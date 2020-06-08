import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { TripLive } from 'src/app/interface/trip-live.interface';
import { Trip } from 'src/app/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private angularDB: AngularFireDatabase) { }

  getAllTripsLive(){
    return this.angularDB.list<Trip>('/Trips/')
  }

  getTripById(id){
    return this.angularDB.object<TripLive>('/Trips/' + id)
  }

  getTripsCancel(){
    return this.angularDB.list<Trip>('/Trips-Canceled-Drivers')
  } 

  getTripsCancelById(id){
    return this.angularDB.object<Trip>('/Trips-Canceled-Drivers/' + id)
  }

  getTripsCancelUser() {
    return this.angularDB.list<Trip>('/Trips-Canceled-Users'  )
  }

  getTripsCancelUserById(id) {
    return this.angularDB.object<Trip>('/Trips-Canceled-Users/' + id)
  }

}
