import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';


@Injectable()
export class AuthService {

  private helper = new JwtHelperService();

  constructor() {
  }

  public tokenSetzen(token: string): void {
    localStorage.setItem('token', token);
  }

  public tokenBeziehen(): string {
    return localStorage.getItem('token');
  }

  public tokenLoeschen(): void {
    localStorage.removeItem('token');
  }

  public istAngemeldet(): boolean {
    const token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token);
  }

  public userIdBeziehen(): number {
    const token = localStorage.getItem('token');

    if(token == null){
      return -1
    }

    const tokenPayload = jwt_decode(token);

    console.log(tokenPayload);

    return tokenPayload.uid;
  }
}
