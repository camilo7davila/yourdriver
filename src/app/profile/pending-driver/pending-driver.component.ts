import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import 'firebase/database';
import { ActivatedRoute } from '@angular/router';
import { Drivers } from 'src/app/interface/user.interface';
import { routes } from 'src/app/apps/email/mail.module';

@Component({
  selector: 'app-pending-driver',
  templateUrl: './pending-driver.component.html',
  styleUrls: ['./pending-driver.component.css']
})
export class PendingDriverComponent implements OnInit {

  id: string
  driver: Drivers
  change: {} = {
    state: ''
  }

  constructor(private userService: UserService,
              private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.route.params.subscribe(driverId => {
      this.id = driverId.id
      this.userService.getDriverById(this.id).valueChanges().subscribe(data => {
        this.driver = data
      })
    })
  }

  driveAccepted(){
    this.change = {state: 2}
    this.userService.editDriver(this.id, this.change).then(() => {
      alert('Se han realizado los cambios')
    }).catch(e => {
      alert(e)
    })
  }

  driveDeny(){
    this.change = {state: 3}
    this.userService.editDriver(this.id, this.change).then(() => {
      alert('Se han realizado los cambios')
    }).catch(e => {
      alert(e)
    })
  }

}
