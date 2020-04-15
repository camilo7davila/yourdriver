import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import 'firebase/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Drivers } from 'src/app/interface/user.interface';
import { routes } from 'src/app/apps/email/mail.module';
import { Email } from 'src/app/interface/mail.interface';
import { CorreoService } from 'src/app/core/services/correo/correo.service';

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

  email: Email

  constructor(private userService: UserService,
              private route: ActivatedRoute, 
              private cS: CorreoService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(driverId => {
      this.id = driverId.id
      this.userService.getDriverById(this.id).valueChanges().subscribe(data => {
        this.driver = data
      })
    })
  }

  sendEmail(email: Email){
    this.cS.sendEmail(email).subscribe(data => {
      alert('correo enviado exitosamente')
      this.router.navigate(['/tables/pendingdriverstrable'])
    }, error => {
      alert('error: '+ error)
    })
  }

  driveAccepted(){
    this.change = {state: 2}
    this.userService.editDriver(this.id, this.change).then(() => {
      alert('Se han realizado los cambios')
      this.email = {
        email: this.driver.Email,
        subject: 'request status yourDrive',
        message:'este es un mensaje que da el acceso al usuario'
      }
      this.sendEmail(this.email)
    }).catch(e => {
      alert(e)
    })
  }

  driveDeny(){
    this.change = {state: 3}
    this.userService.editDriver(this.id, this.change).then(() => {
      alert('Se han realizado los cambios')
      this.email = {
        email: this.driver.Email,
        subject: 'request status yourDrive',
        message:'se le niega el acceso por falta de documentación'
      }
      this.sendEmail(this.email)
    }).catch(e => {
      alert(e)
    })
  }

}
