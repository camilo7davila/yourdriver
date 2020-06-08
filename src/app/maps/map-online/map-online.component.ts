import { Component, OnInit } from '@angular/core';
import { StatusDriverService } from 'src/app/core/services/status-driver/status-driver.service';
import { StatusDriver } from '../../interface/trip-live.interface'
import 'firebase/database';
import { UserService } from 'src/app/core/services/user/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-map-online',
  templateUrl: './map-online.component.html',
  styleUrls: ['./map-online.component.css']
})
export class MapOnlineComponent implements OnInit {

  mapStyle: string = 'dark'

  public darkStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
    }
  ];

  public defaultStyle = [];

  percent: any
  available: number = 0
  busy: number = 0
  inTrip: number = 0
  total: number = 0

  availablePercent: number = 0
  busyPercent: number = 0
  inTripPercent: number = 0

  availableData: StatusDriver[] = []
  driverOnline: any[] = []

  iconAvailable = {
    url: '../../../assets/map/gre.png',
    scaledSize: { width: 20, height: 32.22 }
  }

  // iconBusy = {
  //   url: '../../../assets/map/red.png',
  //   scaledSize: { width: 25, height: 30 }
  // }

  // iconTrip = {
  //   url: '../../../assets/map/car.png',
  //   scaledSize: { width: 25, height: 30 }
  // }

  constructor(private satatusService: StatusDriverService,
    private userService: UserService) { }

  ngOnInit() {
    this.percent = 35
    this.satatusService.getDriveStatus().valueChanges().subscribe(data => {
      this.available = data.Available.Total
      this.busy = data.Busy.Total
      this.inTrip = data.InTrip.Total
      this.lawPercent(this.available, this.busy, this.inTrip)
    })

    this.userService.getDriversOnLine().snapshotChanges().pipe(map(changes => {
      return changes.map(a => ({ key: a.payload.key, ...a.payload.val() }))
    })).subscribe(data => {
      this.driverOnline = data
      data.forEach(driver => {
        this.satatusService.getDriverLocationById(driver.key).valueChanges().subscribe(location => {
          this.availableData.push(location)
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

  lawPercent(available, busy, inTrip) {

    this.total = available + busy + inTrip

    if ((Math.round((available * 100) / this.total)) % 5 === 0) {
      this.availablePercent = Math.round((busy * 100) / this.total)
    } else {
      let resultado = (Math.round((available * 100) / this.total))
      for (let i = 0; i <= 6; i++) {
        if (resultado % 5 !== 0) {
          resultado = resultado + 1
        } else {
          this.availablePercent = resultado
          break
        }
      }
    }

    if ((Math.round((busy * 100) / this.total)) % 5 === 0) {
      this.busyPercent = Math.round((busy * 100) / this.total)
    } else {
      let resultado = (Math.round((busy * 100) / this.total))
      for (let i = 0; i <= 6; i++) {
        if (resultado % 5 !== 0) {
          resultado = resultado + 1
        } else {
          this.busyPercent = resultado
          break
        }
      }
    }

    if ((Math.round((inTrip * 100) / this.total)) % 5 === 0) {
      this.inTripPercent = Math.round((inTrip * 100) / this.total)
    } else {
      let resultado = (Math.round((inTrip * 100) / this.total))
      for (let i = 0; i <= 6; i++) {
        if (resultado % 5 !== 0) {
          resultado = resultado + 1
        } else {
          this.inTripPercent = resultado
          break
        }
      }
    }
    this.zero(available, busy, inTrip)
  }

  zero(available, busy, inTrip) {
    console.log(inTrip);

    if (available === 0) {
      this.availablePercent = 0
    }
    if (busy === 0) {
      this.busyPercent = 0
    }
    if (inTrip === 0) {
      this.inTripPercent = 0
    }
  }

}
