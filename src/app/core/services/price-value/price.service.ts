import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { Observable } from 'rxjs';
import { PriceValue } from 'src/app/interface/price.interface';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private angularDB: AngularFireDatabase) { }

  getPriceValue(): Observable<PriceValue> {
    return this.angularDB.object<PriceValue>('PriceValues').valueChanges()
  }

  editPriceValue(data) {
    return this.angularDB.object('/PriceValues/').update(data)
  }
}
