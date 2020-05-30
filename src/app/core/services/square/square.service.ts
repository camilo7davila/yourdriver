import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SquareService {

  url = environment.urlSquare

  constructor(private http: HttpClient) { }

  completePayment(data) {
    const finalUrl = `${this.url}/completePayment`
    return this.http.post<any>(finalUrl, data)
  }

}
