import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { FehlerService } from "../fehler.service";
import { AuthService } from "../auth.service";

import { ApiAntwort } from "../apiAntwort";

import { Globals } from '../globals.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public anzeigeModus: string = "login";

  public email: string;
  public passwort: string;

  public passwortBestaetigen: string;
  public vorname: string;
  public nachname: string;
  public passwortBenoetigt: boolean;

  constructor(
    private http: HttpClient,
    private fehlerService: FehlerService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  login(): void {
    let requestPost = {
      email: this.email,
      password: this.passwort
    }

    this.http.post<any>(Globals.API_URL + "/api/login", requestPost, httpOptions).subscribe(
      res => {
        this.authService.tokenSetzen(res.data.token);
        this.router.navigate(['benutzer']);
      },
      error => {
        this.fehlerService.fehlermeldungHinzufuegen(error.error.message);
      }
    );
  }

  registrieren(method: String): void {
    if (this.passwort != this.passwortBestaetigen)
    {
      this.fehlerService.fehlermeldungHinzufuegen("Passwörter stimmen nicht überein.");
      return;
    }

    let requestPost = {
      method: method,
      email: this.email,
      password: this.passwort,
      firstname: this.vorname,
      lastname: this.nachname,
      password_required: this.passwortBenoetigt,
    }

    this.http.post<any>(Globals.API_URL + "/api/register", requestPost, httpOptions).subscribe(
      res => {
        this.authService.tokenSetzen(res.data.token);
        this.router.navigate(['benutzer']);
      },
      error => {
        this.fehlerService.fehlermeldungHinzufuegen(error.error.message);
      }
    );
  }
}
