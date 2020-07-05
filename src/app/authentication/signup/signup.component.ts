import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/core/services/administrador/administrador.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'firebase/firestore';
import { Admin } from 'src/app/interface/admin.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup

  constructor(private adminService: AdministradorService,
    private formBuilter: FormBuilder) {
    this.buildForm()
  }

  ngOnInit() { }


  createAdmin(email, password) {
    this.adminService.register(email, password).then(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Mensaje enviado',
        showConfirmButton: false,
        timer: 1500
      })
      let admin: Admin = {
        id: data.user.uid,
        name: this.form.get('name').value,
        email: this.form.get('email').value,
        rol: true
      }
      this.addFireStore(admin, data.user.uid)
    }).catch(e => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error en la creación del usuario auth ${e}`,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  private buildForm() {
    this.form = this.formBuilter.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordTwo: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  validatorPassword() {
    let password = ''
    let passwordTwo = ''
    password = this.form.get('password').value
    passwordTwo = this.form.get('passwordTwo').value
    if (password === passwordTwo) {
      return true
    } else {
      return false
    }
  }

  addFireStore(admin, id) {
    this.adminService.createAdmin(admin, id).then(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'usuario guardado en la db',
        showConfirmButton: false,
        timer: 1500
      })
    }).catch(e => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error en firestore ${e}`,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  save() {
    if (this.validatorPassword() === true) {
      let email = this.form.get('email').value
      let password = this.form.get('password').value
      this.createAdmin(email, password)
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Contraseñas no coinciden`,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

}