import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Drivers } from 'src/app/interface/user.interface';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'firebase/database';

@Component({
  selector: 'app-table-driver',
  templateUrl: './table-driver.component.html',
  styleUrls: ['./table-driver.component.css']
})
export class TableDriverComponent implements OnInit {

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

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private formBuilter: FormBuilder) { 
                this.buildForm()
              }

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      this.driverId = parametros.id
      this.userService.getDriverById(this.driverId).valueChanges().subscribe(dataDriver => {
        this.driver = dataDriver
        this.form.patchValue(dataDriver)
      })
      this.userService.searchTripForDriver(this.driverId).snapshotChanges().pipe(map(changes => {
        return changes.map(data => ({key: data.key, ...data.payload.val()}))
      })).subscribe(trips => {
        trips.forEach(trip => {
          this.userService.getUserById(trip.passengerUid).valueChanges().subscribe(data => {
            this.tripsAndPassengers.push(({...trip, passengerInfo: data}))
          })
        })
      })
    })
  }

  private buildForm() {
    this.form = this.formBuilter.group({
      Name: ['', [Validators.required,Validators.minLength(4)]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required]],
      AccountType: ['', [Validators.required]],
      SSN: ['', [Validators.required]],
      NameBank: ['', [Validators.required]],
      BankAccount: ['', [Validators.required]],
      state: ['',[Validators.required]]
    })
  }

  saveProduct(event){
    event.preventDefault();
    if(this.form.valid){
      this.userService.editDriver(this.driverId, this.form.value).then(() => {
        alert('Editado exitosamente')
      }).catch( e => {
        alert('Algo salio mal y no se pudo editar el perfil')
      })
    }
  }
}
