import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministradorService } from '../services/administrador/administrador.service';
import { map, tap } from 'rxjs/operators';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private adminService: AdministradorService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.adminService.getStatus().pipe(
        map( user => user === null ? false : true),
        tap((hasUser) => {
          if(!hasUser){
            this.router.navigate(['/authentication/login']) 
          }
        })
      );
  }
}
