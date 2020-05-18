import { Component, OnInit } from '@angular/core';
import 'firebase/firestore';
import { AdministradorService } from 'src/app/core/services/administrador/administrador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  login(email, password){
    this.adminService.login(email, password).then(data => {
      this.router.navigate(['/dashboard/dashboard1'])
    }).catch(e => {
      alert('Ocurrio un error: '+e)
    })
  }

  validatorRol(email){
    this.adminService.getAdminByEmail(email).subscribe(data => {
      console.log('esto es data'+ data);
      if(data.length !== 0){
        this.login(this.form.get('email').value, this.form.get('password').value)
      }else{
        alert('Este correo no tiene permisos de administrador')
      }
    }, error => {
      console.log('este correo no tiene permisos de administrador'+ error);
    })
  }

  private buildForm(){
    this.form = this.formBuilter.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  save(){
    this.validatorRol(this.form.get('email').value)
  }

}
