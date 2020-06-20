import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import 'firebase/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Drivers } from 'src/app/interface/user.interface';
import { routes } from 'src/app/apps/email/mail.module';
import { Email } from 'src/app/interface/mail.interface';
import { CorreoService } from 'src/app/core/services/correo/correo.service';
import { MessagingService } from 'src/app/core/services/messaging/messaging.service';
import Swal from 'sweetalert2';

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

  isAccepetd: boolean = true
  isUpdateDb: boolean = false
  isSendEmail: boolean = false
  isSendNotification: boolean = false

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

  setVariableFalse() {
    this.isAccepetd = false
  }

  setVariableTrue() {
    this.isAccepetd = true
  }

  //Enviar notificación
  async sendNotification(data) {

    return this.mS.sendDevice(data).toPromise()
    // return this.mS.sendDevice(data).subscribe(data => {
    //   this.isSendNotification = true
    //   return 'envio de notificación exitoso'
    // }, error => {
    //   return Promise.reject('Ocurrio un error en envio de notificación')
    // })
  }

  //Enviando correo electronico
  async sendEmail(email: Email) {
    this.isSendEmail = true
    return this.cS.sendEmail(email).toPromise()
    // return this.cS.sendEmail(email).subscribe(data => {
    //   return 'correo enviado exitosamente'
    // }, error => {
    //   return Promise.reject('Ocurrio un error en envio de notificación')
    // })
  }

  //Funcion para aceptar un conductor
  async driveAccepted() {
    this.change = { state: 2 }
    this.email = {
      email: this.driver.Email,
      subject: 'request status yourDrive',
      message: 'este es un mensaje que da el acceso al usuario'
    }
    await this.sendEmail(this.email)
    this.isSendEmail = true
    this.notification = {
      to: this.driver.Token,
      type: 'approved'
    }
    await this.sendNotification(this.notification) //enviando notificación push
    this.isSendNotification = true
    await this.userService.editDriver(this.id, this.change)
    this.isUpdateDb = true
    document.getElementById('close').click()
    this.router.navigate(['/tables/pendingdriverstrable'])
  }

  //Funcion para denegar un conductor
  async driveDeny() {
    this.change = { state: 3 }
    this.email = {
      email: this.driver.Email,
      subject: 'request status yourDrive',
      message: `Señor usuario se ha cancelado su solicitud por las siguientes razones : ${this.reason}`
    }
    await this.sendEmail(this.email) // enviando email de rechazo
    this.isSendEmail = true
    this.notification = {
      to: this.driver.Token,
      type: 'denied'
    }
    await this.sendNotification(this.notification) //enviando notificación push
    this.isSendNotification = true
    await this.userService.editDriver(this.id, this.change)
    this.isUpdateDb = true
    document.getElementById('close').click()
    this.router.navigate(['/tables/pendingdriverstrable'])
  }

}
