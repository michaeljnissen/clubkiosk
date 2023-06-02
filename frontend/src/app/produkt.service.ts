import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Produkt } from './produkt';
import { ApiAntwort } from "./apiAntwort";

import { Globals } from './globals.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable()
export class ProduktService {

  private produkte: Produkt[];

  constructor(private http: HttpClient) { }

  bezieheProdukte(): Observable<Produkt[]> {
    return this.http.get<Produkt[]>(Globals.API_URL + "/api/products")
    .map((result) => result as Produkt[])
    .map((result) => this.produkte = result);
  }

  bezieheProdukt(produkt: Produkt): Observable<Produkt>{
    //return of(this.produkte.find( x => x.id === id));
    return this.http.get<Produkt>(Globals.API_URL + "/api/products/" + produkt.id)
      .map((res) => res as Produkt);
  }

  speichereProdukt(produkt: Produkt): Observable<Produkt>
  {
    if (produkt.id != null && produkt.id > 0)
    {
      return this.http.put(Globals.API_URL + "/api/products/" + produkt.id, produkt, httpOptions)
      .map((res) => res as Produkt);
    }
    else
    {
      return this.http.post(Globals.API_URL + "/api/products", produkt, httpOptions)
      .map((res) => res as Produkt);
    }
  }

  aktualisiereBestaende(produkte: Produkt[]): Observable<string> {
    return this.http.post(Globals.API_URL + "/api/stock", produkte, httpOptions)
      .map((res) => res as string);
  }

  loescheProdukt(produkt: Produkt): Observable<any>
  {
    return this.http.delete(Globals.API_URL + "/api/products/" + produkt.id, httpOptions)
      .map((res) => res as any);
  }





}
