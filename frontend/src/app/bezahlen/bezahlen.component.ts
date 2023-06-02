import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";




import { Benutzer } from '../benutzer';
import { ApiAntwort } from "../apiAntwort";

import { InventarElement } from '../inventarElement';
import { BenutzerService } from '../benutzer.service';
import { InventarService } from '../inventar.service';
import { LadeIndikatorService } from '../lade-indikator.service';
import { FehlerService } from '../fehler.service';
import { Globals } from '../globals.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-bezahlen',
  templateUrl: './bezahlen.component.html',
  styleUrls: ['./bezahlen.component.css']
})



export class BezahlenComponent implements OnInit {

  nameSuche: String;

  public benutzerListe: Benutzer[];
  zahlungsart: String;
  private tatsaechlicherBetrag;
  private pin;

  private gewaehlterBenutzer: Benutzer;
  private warenkorbEintraege: InventarElement[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private benutzerService: BenutzerService,
    private inventarService: InventarService,
    private ladeIndikatorService: LadeIndikatorService,
    private fehlerService: FehlerService,
    private http: HttpClient,
    private globals: Globals
) { }

  ngOnInit() {
    this.bezieheBenutzerListe();
    this.bezieheZahlungsart();
    this.warenkorbBeziehen();
  }

  bezieheZahlungsart(): void {
    this.zahlungsart = this.route.snapshot.paramMap.get('zahlungsart');
  }

  bezieheBenutzerListe(): void {
    this.benutzerService.bezieheBenutzerListe().subscribe(benutzer => this.benutzerListe = benutzer);
  }

  warenkorbBeziehen(): void {
    this.inventarService.bezieheAlleProdukte().subscribe(warenkorbEintraege => this.warenkorbEintraege = warenkorbEintraege);
  }

  benutzerZahlungInitiieren(benutzer: Benutzer): void {
    this.gewaehlterBenutzer = benutzer;
    console.log(this.gewaehlterBenutzer);
  }

  jetztBezahlen(): void {
    let requestPost: Object;
    let benutzer = null;

    if (this.gewaehlterBenutzer != undefined)
    {
      benutzer = this.gewaehlterBenutzer.id
    }

    requestPost = {
      payment_method: this.zahlungsart,
      user: benutzer,
      cart: this.warenkorbEintraege,
      total_gross: this.inventarService.bezieheGesamtpreis(),
      total_actual: this.tatsaechlicherBetrag,
      password: this.pin
    };

    console.log(this.warenkorbEintraege);

    this.http.post(Globals.API_URL + "/api/orders", requestPost, httpOptions).subscribe(
      res => {
        this.router.navigate(['kauf-abgeschlossen']);
      },
      error => {
        if(error.status == "401") {
          this.fehlerService.fehlermeldungHinzufuegen("Ungültige PIN.");
        }
        else {
          this.fehlerService.fehlermeldungHinzufuegen(error.error.message);
        }
      }
    );
  }

}
