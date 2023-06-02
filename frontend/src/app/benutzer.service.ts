import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { Benutzer } from './benutzer';
import { ApiAntwort } from "./apiAntwort";

import { Globals } from './globals.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class BenutzerService {

  private benutzer: Benutzer[];

  constructor(
    private http: HttpClient
  ) { }

  bezieheBenutzerListe(): Observable<Benutzer[]>
  {
    return this.http.get<Benutzer[]>(Globals.API_URL + "/api/users")
      .map((res) => res as Benutzer[])
      .map((res) => this.benutzer = res as Benutzer[]);
  }

  bezieheBenutzer(benutzer: Benutzer): Observable<Benutzer>
  {
    return this.http.get<Benutzer>(Globals.API_URL + "/api/users/" + benutzer.id)
      .map((res) => res as Benutzer);
  }

  speichereBenutzer(benutzer: Benutzer): Observable<Benutzer>
  {
    return this.http.put(Globals.API_URL + "/api/users/" + benutzer.id, benutzer, httpOptions)
      .map((res) => res as Benutzer);
  }

  synchronisiereBenutzer(benutzer: string, passwort: string): Observable<string>
  {
    return this.http.post<string>(Globals.API_URL + "/api/users/synchronise", {
      user: benutzer,
      password: passwort
    }, httpOptions)
      .map((res) => res as string);
  }

}
