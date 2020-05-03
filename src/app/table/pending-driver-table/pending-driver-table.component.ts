import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import 'firebase/database';
import { map } from 'rxjs/operators';
import { Drivers } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-pending-driver-table',
  templateUrl: './pending-driver-table.component.html',
  styleUrls: ['./pending-driver-table.component.css']
})
export class PendingDriverTableComponent implements OnInit {
  
  driverPending: Drivers[]

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getDriversPendingFilter().snapshotChanges().pipe(map(changes => {
      return changes.map(a => ( { key: a.key, ...a.payload.val() } ))
    })).subscribe(data => {
      this.driverPending = data
    }) 
  }

}