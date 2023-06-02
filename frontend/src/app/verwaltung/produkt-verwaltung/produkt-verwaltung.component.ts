import { Component, OnInit } from '@angular/core';
import { ProduktService } from '../../produkt.service';
import { Produkt } from '../../produkt';
import { HostListener } from '@angular/core';
import { FehlerService } from '../../fehler.service';
import { Router } from "@angular/router";




@Component({
  selector: 'app-produkt-verwaltung',
  templateUrl: './produkt-verwaltung.component.html',
  styleUrls: ['./produkt-verwaltung.component.css']
})
export class ProduktVerwaltungComponent implements OnInit {

  public aktuellesProdukt: Produkt;
  public produktListe: Produkt[];
  private barcodeLeseModus: Boolean;
  private barcode: string;
  private barcodeGesamt: string;
  private barcodeLetztesZeichen: string;
  private nurAktiveProdukteAnzeigen: Boolean;

  constructor(
    private router: Router,
    private produktService: ProduktService,
    private fehlerService: FehlerService
  ) { }

  ngOnInit() {
    this.bezieheProdukte();
    this.barcodeLeseModus = false;
    this.barcodeGesamt = "";
    this.barcodeLetztesZeichen = "";
    this.nurAktiveProdukteAnzeigen = true;
  }

  neuesProdukt(): void {
    this.aktuellesProdukt = new Produkt();
  }

  bezieheProdukte(): void {
    this.produktService.bezieheProdukte().subscribe(produkte => this.produktListe = produkte);
  }

  waehleProdukt(produkt: Produkt): void {
    this.produktService.bezieheProdukt(produkt).subscribe(aktuellesProdukt => this.aktuellesProdukt = aktuellesProdukt);
  }

  speichereProdukt(produkt: Produkt): void {
    this.produktService.speichereProdukt(produkt).subscribe(
      aktuellesProdukt => {
        this.aktuellesProdukt = aktuellesProdukt;
        this.bezieheProdukte();
        this.aktuellesProdukt = null;
      },
      error => {
        this.fehlerService.fehlermeldungHinzufuegen(error.error.message);
      }
    );
  }

  loescheProdukt(): void {
    this.produktService.loescheProdukt(this.aktuellesProdukt).subscribe(
      res => {
        this.bezieheProdukte();
        this.aktuellesProdukt = null;
      },
      error => {
        console.log(error);
        this.fehlerService.fehlermeldungHinzufuegen(error.error.message);
      }
    );
  }

  /* Barcodelesefunktionen zum automatischen Einlesen des Barcodes */

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.key;

    // Barcodelesemodus anschaltne, wenn Praefix gefunden
    if(this.barcodeLetztesZeichen == "{" && key == "{") {
      this.barcodeLeseModus = true;
      this.barcodeGesamt = "";
    }

    // Barcodelesemodus ausschalten, wenn Suffix gefunden
    if(this.barcodeLetztesZeichen == "}" && key == "}") {
      this.barcodeLeseModus = false;
      this.aktuellesProdukt.gtin = this.barcodeGesamt;
    }

    // Nur Zeichen speichern, wenn Barcode an und nicht Praefix oder Suffix
    if(this.barcodeLeseModus && (key != "{" && key != "}")) {
      this.barcodeGesamt += key;
    }

    this.barcodeLetztesZeichen = key;
  }


}
