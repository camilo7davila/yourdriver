import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from './pipes/pipes.module';
import { AppState } from './app.state';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MailComponent } from './mail.component';
import { MailComposeComponent } from './mail-compose/mail-compose.component';


export const routes = [
  {
    path: '',
    component: MailComponent,
    children: [
      { path: '', redirectTo: 'mail-compose', pathMatch: 'full' },
      { path: 'mail-compose', component: MailComposeComponent },
      { path: 'mail-compose/:correo', component: MailComposeComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    MailComponent,
    MailComposeComponent,
  ],
  providers: [AppState]
})
export class MailModule { }
