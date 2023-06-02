import { Component, OnInit } from '@angular/core';
import { BestellungService } from '../../bestellung.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../globals.service';
import { Bestellung } from '../../bestellung';


@Component({
  selector: 'app-bestellungen-verwaltung',
  templateUrl: './bestellungen-verwaltung.component.html',
  styleUrls: ['./bestellungen-verwaltung.component.css']
})
export class BestellungenVerwaltungComponent implements OnInit {

  public aktuelleBestellung: Bestellung;
  public bestellungsListe: Bestellung[];


  constructor(
    private bestellungService: BestellungService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.bezieheBestellungen();
  }

  bezieheBestellungen(): void {
    this.http.get<Bestellung[]>(Globals.API_URL + "/api/orders")
      .subscribe((res) => this.bestellungsListe = res);
  }

  waehleBestellung(bestellung: Bestellung): void {
    this.http.get<Bestellung>(Globals.API_URL + "/api/orders/" + bestellung.id)
      .subscribe((res) => this.aktuelleBestellung = res);
  }


}
