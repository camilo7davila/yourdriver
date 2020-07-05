import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/core/services/messaging/messaging.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'firebase/database';
import { UserService } from 'src/app/core/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  form: FormGroup;
  formPerson: FormGroup;
  group: any[];
  isGroup: boolean = true
  users: { AccountType: number; Email: String; LastName: String; Name: String; PhoneNumber: String; profileImageUrl: String; key: string; }[];

  constructor(private mS: MessagingService,
    private fB: FormBuilder,
    private userService: UserService) {
    this.formBuild()
    this.formBuildPerson()
  }

  ngOnInit() {
    this.mS.getGroups().valueChanges().subscribe(data => {
      this.group = data
    })
  }

  private formBuild() {
    this.form = this.fB.group({
      title: [{ value: 'YourDriver', disabled: true }],
      body: ['', Validators.required],
      to: ['', Validators.required]
    })
  }

  private formBuildPerson() {
    this.formPerson = this.fB.group({
      title: [{ value: 'YourDriver', disabled: true }],
      to: ['', Validators.required],
      body: ['', Validators.required]
    })
  }

  setIsGroupTrue() {
    this.isGroup = true
  }

  setIsGroupFalse() {
    this.userService.getUsers().subscribe(data => {
      this.users = data
      this.isGroup = false
    })
  }

  sendGroup() {
    this.mS.sendApi(this.form.getRawValue()).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Mensaje enviado',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Ocurrio un erro al enviar el msj ${error}`,
        showConfirmButton: false,
        timer: 1500
      })
      console.log('Ocurrio un error' + JSON.stringify(error));
    })
  }

  sendToPerson() {

    //Cambiar por nueva api

    // this.mS.sendApi(this.formPerson.getRawValue()).subscribe(data => {
    //   alert('Se envio mensaje exitosamente' + JSON.stringify(data))
    // }, error => {
    //   console.log('Ocurrio un error' + JSON.stringify(error));
    // })
  }

}