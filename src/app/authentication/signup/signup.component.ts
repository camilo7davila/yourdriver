import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/core/services/administrador/administrador.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'firebase/firestore';
import { Admin } from 'src/app/interface/admin.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  form: FormGroup

  constructor(private adminService: AdministradorService,
    private formBuilter: FormBuilder) { 
      this.buildForm()
    }

  ngOnInit() { }

  
  createAdmin(email,password) {
    this.adminService.register(email,password).then(data => {
      alert('Se creo usuario exitosamente')
      let admin:Admin = {
        id: data.user.uid,
        name: this.form.get('name').value,
        email: this.form.get('email').value,
        rol: true
      }
      this.addFireStore(admin, data.user.uid)
    }).catch(e => {
      alert(`Ocurrio un error en la creación del usuario: ${e}`)
    })
  }

  private buildForm(){
    this.form = this.formBuilter.group({
      name: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordTwo: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  validatorPassword(){
    let password=''
    let passwordTwo=''
    password = this.form.get('password').value
    passwordTwo = this.form.get('passwordTwo').value
    if(password === passwordTwo){
      return true
    }else{
      return false
    }
  }

  addFireStore(admin,id){
    this.adminService.createAdmin(admin, id).then(data => {
      alert('usuario guardado en firestore id:'+ id)
    }).catch(e => {
      alert('ocurrio un error en firestore' + e)
    })
  }

  save(){
    if(this.validatorPassword() === true){
      let email = this.form.get('email').value
      let password = this.form.get('password').value
      this.createAdmin(email,password)
    }else{
      alert('las contraseñas no coinciden')
    }
  }

}