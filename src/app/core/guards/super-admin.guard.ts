import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministradorService } from '../services/administrador/administrador.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  constructor(private adminService: AdministradorService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.adminService.getStatus().pipe(
      // map(user => user === null ? false : true),
      map(user => {
        if (user === null || user.uid !== 'mT59GTbYKqOoUn0weyLX0R03ozm2') {
          return false
        } else {
          return true
        }
      }),
      tap((hasUser) => {
        console.log(hasUser);
      })
    );
  }
}
