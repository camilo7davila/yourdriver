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

  public darkStyle = [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
  ];

  public defaultStyle = [];

  mapStyle: string = 'dark'
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
  inTripData: StatusDriver[]

  iconAvailable ={
    url: '../../../assets/map/gre.png',
    scaledSize: { width: 25, height: 30 }
  }

  iconBusy ={
    url: '../../../assets/map/red.png',
    scaledSize: { width: 25, height: 30 }
  }

  iconTrip ={
    url: '../../../assets/map/car.png',
    scaledSize: { width: 25, height: 30 }
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
        this.satatusService.getDriversLocationsinTrip().subscribe(dataInTrip => {
          this.inTrip = dataInTrip.length
          this.inTripData = dataInTrip
          this.lawPercent(this.available,  this.busy, this.inTrip)
        })
      })
    })
  }

  /**
   * Función para poner el porcentaje en multiplos multiplos de 5 para pintarlos
   * @param available conductores disponibles
   * @param busy conductores no disponibles
   * @param inTrip conductores en viaje
   */
  
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
      this.busyPercent = Math.round((busy*100)/this.total)
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
    this.zero(available, busy, inTrip)
  }

  zero(available, busy, inTrip){
    console.log(inTrip);
    
    if(available === 0){
      this.availablePercent = 0
    }
    if(busy === 0){
      this.busyPercent = 0
    }
    if(inTrip === 0){
      this.inTripPercent = 0
    }
  }

}
