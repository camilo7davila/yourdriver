import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { TripLive } from 'src/app/interface/trip-live.interface';
import { Observable } from 'rxjs';

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

}
