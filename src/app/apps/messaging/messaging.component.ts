import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/core/services/messaging/messaging.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  form: FormGroup
  group: any[]

  constructor(private mS: MessagingService,
              private fB: FormBuilder) { 
                this.formBuild()
              }

  ngOnInit() {
    this.mS.getGroups().valueChanges().subscribe(data => {
      this.group = data
    })
  }

  private formBuild(){
    this.form = this.fB.group({
      title: ['YourDriver'],
      body: ['', Validators.required],
      to: ['', Validators.required]
    })
  }

  send(){
    this.form.get('title').setValue('YourDriver')
    this.mS.sendApi(this.form.value).subscribe(data => {
      alert('Se envio mensaje exitosamente'+ JSON.stringify(data))
    },error => {
      console.log('Ocurrio un error' + JSON.stringify(error) );
    } )
  }

}