import { Injectable } from '@angular/core';
import { Email } from '../../../interface/mail.interface'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  ulr = environment.urlSquare

  constructor(private http: HttpClient) { }

  sendEmail(request){
    const urlFinal = `${this.ulr}/mail`
    return this.http.post<Email>(urlFinal, request)
  }
}
