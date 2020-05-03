import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import 'firebase/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Drivers } from 'src/app/interface/user.interface';
import { routes } from 'src/app/apps/email/mail.module';
import { Email } from 'src/app/interface/mail.interface';
import { CorreoService } from 'src/app/core/services/correo/correo.service';
import { MessagingService } from 'src/app/core/services/messaging/messaging.service';

@Component({
  selector: 'app-pending-driver',
  templateUrl: './pending-driver.component.html',
  styleUrls: ['./pending-driver.component.css']
})
export class PendingDriverComponent implements OnInit {

  reason: ''
  id: string
  driver: Drivers
  change: {} = {
    state: ''
  }

  notification: any
  email: Email

  constructor(private userService: UserService,
              private route: ActivatedRoute, 
              private cS: CorreoService,
              private mS: MessagingService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(driverId => {
      this.id = driverId.id
      this.userService.getDriverById(this.id).valueChanges().subscribe(data => {
        this.driver = data
      })
    })
  }

  //Enviar notificación
  sendNotification(data){
    this.mS.sendDevice(data).subscribe(data => {
      alert('Notificación enviada correctamente')
      this.router.navigate(['/tables/pendingdriverstrable'])
    },error => {
      alert(`occurrio un error al enviar la notificación ${JSON.stringify(error)}`)
    })
  }
  
  //Enviando correo electronico
  sendEmail(email: Email){
    this.cS.sendEmail(email).subscribe(data => {
      alert('correo enviado exitosamente')
    }, error => {
      alert('error: '+ error)
    })
  }

  //Funcion para aceptar un conductor
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

      this.notification = {
        to: this.driver.Token,
        type: 'approved'
      }
      this.sendNotification(this.notification) //enviando notificación push
    }).catch(e => {
      alert(e)
    })
  }

  //Funcion para denegar un conductor
  driveDeny(){
    this.change = {state: 3}
    this.userService.editDriver(this.id, this.change).then(() => {
      alert('Se han realizado los cambios')
      this.email = {
        email: this.driver.Email,
        subject: 'request status yourDrive',
        message: `Señor usuario se ha cancelado su solicitud por las siguientes razones : ${this.reason}`
      }
      this.sendEmail(this.email) // enviando email de rechazo

      this.notification = {
        to: this.driver.Token,
        type: 'denied'
      }
      this.sendNotification(this.notification) //enviando notificación push
    }).catch(e => {
      alert(JSON.stringify(e))
    })
  }

}
