import { Injectable } from '@angular/core';
import { Email } from '../../../interface/mail.interface'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor(private http: HttpClient) { }

  sendEmail(request){
    const url = 'https://yourdriverusatest.herokuapp.com/mail'
    return this.http.post<Email>(url, request)
  }
}
