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

  @ViewChild(RouterOutlet, {static: true}) outlet: RouterOutlet;

  userId: string
  user: User
  tripsAndDrivers: any[] = []

  form: FormGroup

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
        trips.map(trip => {
          this.userService.getDriverById(trip.driverUid).valueChanges().subscribe(data => {
            this.tripsAndDrivers.push({ ...trip, driverInfo: data })
          })
        })
      })
      console.log(this.tripsAndDrivers);
    })
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "errorpage")
          this.outlet.deactivate();
  });
  }

  private buildForm() {
    this.form = this.formBuilter.group({
      Name: ['', [Validators.required,Validators.minLength(4)]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required]],
      AccountType: ['', [Validators.required]]
    })
  }

  saveProduct(event){
    event.preventDefault();
    if(this.form.valid){
      this.userService.editUser(this.userId, this.form.value).then(()=> {
        alert('Datos actualizados')
      }).catch(e => {
        alert('ocurrio un error'+ e)
      })
    }
  }
}
