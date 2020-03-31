import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { User, Trip } from 'src/app/interface/user.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit {

  userId: string
  user: User
  tripsAndDrivers: any[] = []

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.userId = data.id;
      this.userService.getUserById(this.userId).valueChanges().subscribe(user => {
        this.user = user
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
    })
  }

}
