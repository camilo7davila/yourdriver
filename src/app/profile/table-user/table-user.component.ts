import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { ActivatedRoute, RouterOutlet, Router, ActivationStart } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User, Trip } from 'src/app/interface/user.interface';
import { map } from 'rxjs/operators';
import 'firebase/database';


@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit {

  @ViewChild(RouterOutlet, { static: true }) outlet: RouterOutlet;
  @ViewChild('map1', { static: true }) map1;

  iconOrigin = {
    url: '../../../assets/map/driver.png',
    scaledSize: { width: 25, height: 30 }
  }

  iconDest = {
    url: '../../../assets/map/dest.png',
    scaledSize: { width: 25, height: 30 }
  }

  userId: string
  user: User
  tripsAndDrivers: any[] = []

  form: FormGroup
  totalSpend: number = 0;
  flag: boolean = true
  tripsTotal: number = 0;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilter: FormBuilder) {
    this.buildForm()
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.userId = data.id;
      this.userService.getUserById(this.userId).valueChanges().subscribe(user => {
        this.user = user
        this.form.patchValue(user)
      })
      this.userService.searchTripForPassenger(this.userId).snapshotChanges().pipe(map(changes => {
        return changes.map(ref => ({ key: ref.key, ...ref.payload.val() }))
      })).subscribe(trips => {
        this.tripsTotal = trips.length
        if (trips.length === 0) {
          this.flag = false
        }else {
          this.reducer(trips)
          this.orderByDate(trips)
        }
        trips.map(trip => {
          this.userService.getDriverById(trip.driverUid).valueChanges().subscribe(data => {
            this.tripsAndDrivers.push({ ...trip, driverInfo: data })
            data
          })
        })
        // console.log(this.tripsAndDrivers);
      })
    })
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "errorpage")
        this.outlet.deactivate();
    });
  }

  orderByDate(trips: Trip[]) {
    trips.sort((a, b) => {
      if(a.dateStart < b.dateStart) {
        return 1
      }
      if(a.dateStart > b.dateStart) {
        return -1
      }
      return 0
    })
  }

  reducer(trips) {
    let reducer = ((acumulador, item) => {
      return acumulador + item.priceTrip
    })
    this.totalSpend = trips.reduce(reducer, 0)
  }

  private buildForm() {
    this.form = this.formBuilter.group({
      Name: ['', [Validators.required, Validators.minLength(4)]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required]],
      AccountType: ['', [Validators.required]]
    })
  }

  saveProduct(event) {
    event.preventDefault();
    if (this.form.valid) {
      this.userService.editUser(this.userId, this.form.value).then(() => {
        alert('Datos actualizados')
      }).catch(e => {
        alert('ocurrio un error' + e)
      })
    }
  }
}
