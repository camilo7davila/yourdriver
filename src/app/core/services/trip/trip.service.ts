import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { TripLive } from 'src/app/interface/trip-live.interface';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private angularDB: AngularFireDatabase) { }

  getAllTripsLive(){
    return this.angularDB.list<TripLive>('/Trips')
  }

  getTripById(id){
    return this.angularDB.object<TripLive>('/Trips/' + id)
  }

  getTripsCancel(){
    return this.angularDB.list<Trip>('/Trips-Canceled')
  }

  getTripsCancelById(id){
    return this.angularDB.object<Trip>('/Trips-Canceled/' + id)
  }

}
