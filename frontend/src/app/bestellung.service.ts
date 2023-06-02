import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { Bestellung } from './bestellung';
import { ApiAntwort } from "./apiAntwort";

import { Globals } from './globals.service';

@Injectable()
export class BestellungService {

  private bestellungen: Bestellung[];

  constructor(
    private http: HttpClient
  ) { }


  bezieheBestellungsListe(): Observable<Bestellung[]>
  {
    return this.http.get<Bestellung[]>(Globals.API_URL + "/api/orders")
      .map((res) => res as Bestellung[])
      .map((res) => this.bestellungen = res as Bestellung[]);
  }

  bezieheBestellung(bestellung: Bestellung): Observable<Bestellung>
  {
    return this.http.get<Bestellung>(Globals.API_URL + "/api/orders/" + bestellung.id)
      .map((res) => res as Bestellung);
  }


}
