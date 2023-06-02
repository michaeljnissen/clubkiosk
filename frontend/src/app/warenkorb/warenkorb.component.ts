import { Component, OnInit } from '@angular/core';

import { Produkt } from '../produkt';
import { InventarElement } from '../inventarElement';
import { InventarService }  from '../inventar.service';

@Component({
  selector: 'app-warenkorb',
  templateUrl: './warenkorb.component.html',
  styleUrls: ['./warenkorb.component.css']
})
export class WarenkorbComponent implements OnInit {

  warenkorbEintraege: InventarElement[];

  constructor(private inventarService: InventarService) { }

  ngOnInit() {
    this.holeWarenkorb();
  }

  private holeWarenkorb(): void
  {
    //this.warenkorbEintraege = this.inventarService.bezieheAlleProdukte();
    this.inventarService.bezieheAlleProdukte().subscribe(warenkorbEintraege => this.warenkorbEintraege = warenkorbEintraege);
  }

  private inkrementiereProduktEintrag(e: InventarElement): void
  {
    this.inventarService.setzeProduktMenge(e.produkt, e.menge+1);
  }

  private dekrementiereProduktEintrag(e: InventarElement): void
  {
    if(e.menge > 1) {
      this.inventarService.setzeProduktMenge(e.produkt, e.menge-1);
    }
  }

  private entferneProduktEintrag(e: InventarElement): void
  {
    this.inventarService.entferneProdukt(e.produkt);
  }

}
