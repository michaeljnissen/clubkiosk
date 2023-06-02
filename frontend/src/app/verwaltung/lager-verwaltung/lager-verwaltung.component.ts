import { Component, OnInit } from '@angular/core';

import { ProduktService } from '../../produkt.service';
import { Produkt } from '../../produkt';

import { FehlerService } from "../../fehler.service";



@Component({
  selector: 'app-lager-verwaltung',
  templateUrl: './lager-verwaltung.component.html',
  styleUrls: ['./lager-verwaltung.component.css']
})
export class LagerVerwaltungComponent implements OnInit {

  public produktListe: Produkt[];

  constructor(
    private produktService: ProduktService,
    private fehlerService: FehlerService
  ) { }

  ngOnInit() {
    this.bezieheProdukte();
  }

  bezieheProdukte(): void {
    this.produktService.bezieheProdukte().subscribe(produkte => this.produktListe = produkte);
  }

  aktualisiereBestaende(): void {
    this.produktService.aktualisiereBestaende(this.produktListe).subscribe(
      res => {
      },
      res => {
        this.fehlerService.fehlermeldungHinzufuegen(res);
      });
  }


}
