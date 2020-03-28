import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularDB: AngularFireDatabase) { }

  getDriversPending(){
    return this.angularDB.list('/Drivers', ref => ref.orderByChild('state').equalTo(1)).snapshotChanges()
  }
}
