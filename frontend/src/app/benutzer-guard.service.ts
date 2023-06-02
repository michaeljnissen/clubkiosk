import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import * as jwt_decode from 'jwt-decode';


@Injectable()
export class BenutzerGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const erwarteteRolle = route.data.erwarteteRolle;
    const token = localStorage.getItem('token');

    if(token == null){
      this.router.navigate(['login']);
      return false;
    }

    const tokenPayload = jwt_decode(token);

    console.log(tokenPayload);

    if (!this.auth.istAngemeldet() || (tokenPayload.role.indexOf(erwarteteRolle) < 0)) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

}
