import { Component, ViewEncapsulation , OnInit} from '@angular/core';
import { CorreoService } from 'src/app/core/services/correo/correo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mail-compose',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mail-compose.component.html',
  styleUrls: ['./mail-compose.component.scss'],
})
export class MailComposeComponent implements OnInit {
  
  form: FormGroup; 

  constructor(private cS: CorreoService,
              private formBuilter: FormBuilder) {
                this.buildForm()
              }

  ngOnInit(){
    
  }

  private buildForm(){
    this.form = this.formBuilter.group({
      subject: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    })
  }

  send(){
    this.cS.sendEmail(this.form.value).subscribe(data => {
      alert('el mensaje fue enviado exitosamente')
      this.form.reset()
    },error => {
      alert('Ocurrio un error al enviar el msj' + error)
    })
  }

}
