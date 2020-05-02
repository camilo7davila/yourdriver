import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Key=AAAAF-KDsf8:APA91bF2RRVeR4ovi1b4qimVIQBmfB3SA0h1nidyXQ7gY-K23qZODzBei2gXmHuHaFazcqap77CZJkRkjejyAgIDPqxxK0MovvEZGRpAgut1QgSx6lCG5JaWi8VCbjJ9KAWcuFIl4eg1",
    "Accept": "application/json",
    // "project_id": "102584529407"
  });

  constructor(private http: HttpClient, private angularDB: AngularFireDatabase) {}

  getGroups(){
    return this.angularDB.list('/GroupNotification')
  }

  sendApi(data){
    const url = 'https://us-central1-yourdriver-7b0c9.cloudfunctions.net/api/sendMessageToGroup';
    return this.http.post<any>(url, data)
  }

  sendDevice(data){
    const url = 'https://us-central1-yourdriver-7b0c9.cloudfunctions.net/api/sendMessageToDevice'
    return this.http.post<any>(url, data)
  }

}
