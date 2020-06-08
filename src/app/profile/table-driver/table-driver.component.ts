import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Drivers, Trip } from 'src/app/interface/user.interface';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'firebase/database';

@Component({
  selector: 'app-table-driver',
  templateUrl: './table-driver.component.html',
  styleUrls: ['./table-driver.component.css']
})
export class TableDriverComponent implements OnInit {

  private contentPlace: ElementRef;

  @ViewChild('progressBarView', { static: false }) set content(myProgressBar: ElementRef) {
    this.contentPlace = myProgressBar
  }

  iconOrigin = {
    url: '../../../assets/map/driver.png',
    scaledSize: { width: 25, height: 30 }
  }

  iconDest = {
    url: '../../../assets/map/dest.png',
    scaledSize: { width: 25, height: 30 }
  }

  driverId: string
  driver: Drivers
  tripsAndPassengers: any[] = []

  form: FormGroup
  totalEarn: number = 0;
  totalTrips: number;
  flag: boolean = true;
  parcialEarn: any;
  ratingAverage: number = 0

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private formBuilter: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef) {
    this.buildForm()
  }



  ngOnInit() {
    this.route.params.subscribe(parametros => {
      this.driverId = parametros.id;
      this.userService.getDriverById(this.driverId).valueChanges().subscribe(dataDriver => {
        this.driver = dataDriver;
        this.changeDetectorRef.detectChanges();
        this.form.patchValue(dataDriver)
        this.skillsSet(this.driver);
      })
      this.userService.searchTripForDriver(this.driverId).snapshotChanges().pipe(map(changes => {
        return changes.map(data => ({ key: data.key, ...data.payload.val() }))
      })).subscribe(trips => {
        if (trips.length === 0) {
          this.flag = false
        } else {
          this.orderByDate(trips)
          this.reducer(trips)
        }
        this.totalTrips = trips.length
        trips.forEach(trip => {
          this.userService.getUserById(trip.passengerUid).valueChanges().subscribe(data => {
            this.tripsAndPassengers.push(({ ...trip, passengerInfo: data }))
          })
        })
      })
    })
  }

  skillsSet(driver) {
    this.ratingAverage = Math.round((driver.rating.ratingProm * 100) / 5)
    this.contentPlace.nativeElement.style.width = `${this.ratingAverage}%`
  }

  orderByDate(trips: Trip[]) {
    trips.sort((a, b) => {
      if (a.dateStart < b.dateStart) {
        return 1
      }
      if (a.dateStart > b.dateStart) {
        return -1
      }
      return 0
    })
  }

  reducer(trips: Trip[]) {
    let reducer = ((acumulador, item) => {
      return acumulador + item.priceTrip
    })
    this.parcialEarn = trips.reduce(reducer, 0)
    this.totalEarn = this.parcialEarn * 0.8
  }

  private buildForm() {
    this.form = this.formBuilter.group({
      Name: ['', [Validators.required, Validators.minLength(4)]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required]],
      driverStatus: ['', [Validators.required]],
      SSN: ['', [Validators.required]],
      NameBank: ['', [Validators.required]],
      BankAccount: ['', [Validators.required]],
      state: ['', [Validators.required]]
    })
  }

  saveProduct(event) {
    event.preventDefault();
    if (this.form.valid) {
      this.userService.editDriver(this.driverId, this.form.value).then(() => {
        alert('Editado exitosamente')
      }).catch(e => {
        alert('Algo salio mal y no se pudo editar el perfil')
      })
    }
  }
}
