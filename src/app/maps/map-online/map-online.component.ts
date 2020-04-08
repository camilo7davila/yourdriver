import { Component, OnInit } from '@angular/core';
import { StatusDriverService } from 'src/app/core/services/status-driver/status-driver.service';
import { StatusDriver } from '../../interface/trip-live.interface'
import 'firebase/database';

@Component({
  selector: 'app-map-online',
  templateUrl: './map-online.component.html',
  styleUrls: ['./map-online.component.css']
})
export class MapOnlineComponent implements OnInit {

  percent: any
  available: number= 0
  busy: number = 0
  inTrip: number = 0
  total: number = 0

  availablePercent: number = 0
  busyPercent: number = 0
  inTripPercent: number = 0

  availableData: StatusDriver[]
  busyData: StatusDriver[]

  icon ={
    url: '../../../assets/map/convertible.png',
    scaledSize: { width: 64, height: 38 }
  }

  constructor(private satatusService: StatusDriverService) { }

  ngOnInit() {
    this.percent = 35
    this.satatusService.getDriversLocationsAvailable().subscribe(data => {
      this.available = data.length
      this.availableData = data
      this.satatusService.getDriversLocationsBusy().subscribe(dataBusy => {
        this.busy = dataBusy.length
        this.busyData = dataBusy
        console.log('available ==============>', this.availableData);
        console.log('Busy =================>', this.busyData);
        
        this.lawPercent(this.available, this.busy, this.inTrip)
      })
    })
  }

  lawPercent(available, busy, inTrip){

    this.total = available + busy + inTrip

    if( (Math.round((available*100)/this.total))%5 === 0){
    this.availablePercent = Math.round((busy*100)/this.total)
    }else{
      let resultado = (Math.round((available*100)/this.total))
      for (let i = 0; i <= 6; i++) {
        if(resultado % 5 !== 0){
          resultado = resultado + 1
        }else{
          this.availablePercent = resultado
          break
        }
      }
    }

    if((Math.round((busy*100)/this.total))%5 === 0){
      this.busyPercent = Math.round((available*100)/this.total)
    }else{
      let resultado = (Math.round((busy*100)/this.total))
      for (let i = 0; i <= 6; i++) {
        if(resultado % 5 !== 0){
          resultado = resultado + 1
        }else{
          this.busyPercent = resultado
          break
        }
      }
    }

    if((Math.round((inTrip*100)/this.total))%5 === 0){
      this.inTripPercent = Math.round((inTrip*100)/this.total)
    }else{
      let resultado = (Math.round((inTrip*100)/this.total))
      for (let i = 0; i <= 6; i++) {
        if(resultado % 5 !== 0){
          resultado = resultado + 1
        }else{
          this.inTripPercent = resultado
          break
        }
      }
    }
  }

}
