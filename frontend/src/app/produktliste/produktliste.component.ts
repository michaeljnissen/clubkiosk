import { Component, OnInit } from '@angular/core';
import { Produkt } from '../produkt';
import { ProduktService } from '../produkt.service';
import { InventarService } from '../inventar.service';
import { FehlerService } from '../fehler.service';
import { Globals } from '../globals.service';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';



@Component({
  selector: 'app-produktliste',
  templateUrl: './produktliste.component.html',
  styleUrls: ['./produktliste.component.css']
})
export class ProduktlisteComponent implements OnInit {

  produkte: Produkt[];
  nameSuche: String;
  private barcodeLeseModus: Boolean;
  private barcode: string;
  private barcodeGesamt: string;
  private barcodeLetztesZeichen: string;


  constructor(
    private produktService: ProduktService,
    private inventarService: InventarService,
    private globals: Globals,
    private router: Router,
    private fehlerService: FehlerService
  ) { }

  ngOnInit() {
    this.bezieheProdukte();
    this.barcodeLeseModus = false;
    this.barcodeGesamt = "";
    this.barcodeLetztesZeichen = "";

  }

  bezieheProdukte(): void {
    this.produktService.bezieheProdukte().subscribe(produkte => this.produkte = produkte);
  }

  schnellKaufen(p: Produkt): void {
    this.inventarService.fuegeProduktHinzu(p, 1);
    this.router.navigateByUrl('/warenkorb');
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
      let produkt = this.produkte.find(x => x.gtin == this.barcodeGesamt);
      if (produkt == null) {
        this.fehlerService.fehlermeldungHinzufuegen("Produkt nicht vorhanden.");
        return;
      }
      this.schnellKaufen(produkt);
    }

    // Nur Zeichen speichern, wenn Barcode an und nicht Praefix oder Suffix
    if(this.barcodeLeseModus && (key != "{" && key != "}")) {
      this.barcodeGesamt += key;
    }

    this.barcodeLetztesZeichen = key;
  }

}
