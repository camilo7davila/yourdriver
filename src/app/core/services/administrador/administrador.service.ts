import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Admin } from 'src/app/interface/admin.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private db: AngularFirestore,
    private angularFireAuth: AngularFireAuth) { }

  register(email, password) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
  }

  login(email, password) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
  }

  getStatus() {
    return this.angularFireAuth.authState
  }

  logout() {
    return this.angularFireAuth.signOut();
  }

  createAdmin(user: Admin, id){
    return this.db.collection<Admin>('admin').doc(id).set(user)
  }

  getAdminByEmail(email){
    return this.db.collection<Admin>('admin', ref => {
      return ref.where('email', '==', email)
    }).valueChanges()
  }

}