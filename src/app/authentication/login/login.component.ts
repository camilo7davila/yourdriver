import { Component, OnInit } from '@angular/core';
import 'firebase/firestore';
import { AdministradorService } from 'src/app/core/services/administrador/administrador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(private adminService: AdministradorService,
    private formBuilter: FormBuilder,
    private router: Router) {
    this.buildForm()
  }

  ngOnInit() { }

  login(email, password) {
    this.adminService.login(email, password).then(data => {
      this.router.navigate(['/dashboard/dashboard1'])
    }).catch(e => {
      console.log('error en firebase', e);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Ocurrio un error en la db ${e}`,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  validatorRol(email) {
    this.adminService.getAdminByEmail(email).subscribe(data => {
      console.log('esto es data', data);
      if (data.length !== 0) {
        this.login(this.form.get('email').value, this.form.get('password').value)
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Este correo no tiene permisos de administrador`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    }, error => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Este correo no tiene permisos de administrador ${error}`,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  save() {
    this.validatorRol(this.form.get('email').value)
  }

  private buildForm() {
    this.form = this.formBuilter.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
}
