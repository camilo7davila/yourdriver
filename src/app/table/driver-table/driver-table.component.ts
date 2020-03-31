import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { map } from 'rxjs/operators';
import { Drivers } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['./driver-table.component.css']
})
export class DriverTableComponent implements OnInit {

  drivers: Drivers[]

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getDriversWhitId().snapshotChanges().pipe(map(changes => {
      return changes.map(data => ({key: data.key, ...data.payload.val()}))
    })).subscribe(drivers => {
      this.drivers = drivers
    })
  }

}
