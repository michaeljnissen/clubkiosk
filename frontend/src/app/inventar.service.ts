import { Injectable } from '@angular/core';

import { Produkt } from './produkt';
import { InventarElement } from './inventarElement';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


@Injectable()
export class InventarService {

  private inventarEintraege: InventarElement[] = [];

  constructor() { }

  fuegeProduktHinzu(p: Produkt, m: number): void {

    // iteriere durch inventarElemente und erhoehe die Menge falls das Produkt bereits vorhanden ist

    for (var i = 0; i < this.inventarEintraege.length; i++)
    {
      if (this.inventarEintraege[i].produkt.id == p.id)
      {
        this.inventarEintraege[i].menge = this.inventarEintraege[i].menge + m;
        return;
      }
    }

    // das Produkt ist noch nicht vorhanden

    let neuerEintrag: InventarElement = {
      produkt: p,
      menge: m
    };

    this.inventarEintraege.push(neuerEintrag);
  }

  setzeProduktMenge(p: Produkt, m: number): void {

    for (var i = 0; i < this.inventarEintraege.length; i++)
    {
      if (this.inventarEintraege[i].produkt.id == p.id)
      {
        this.inventarEintraege[i].menge = m;
        return;
      }
    }

  }

  entferneProdukt(p: Produkt): void {
    for (var i = 0; i < this.inventarEintraege.length; i++)
    {
      if (this.inventarEintraege[i].produkt.id === p.id)
      {
        this.inventarEintraege.splice(i, 1);
        return;
      }
    }
  }

  bezieheAlleProdukte(): Observable<InventarElement[]> {
    return of(this.inventarEintraege);
  }

  bezieheGesamtpreis(): Number {
    let gesamt: number = 0.00;
    this.inventarEintraege.forEach(eintrag => {
      gesamt += Math.round(eintrag.produkt.priceGross * eintrag.menge * 100)/100;
    });
    return gesamt;
  }

  leereInventar(): void
  {
    this.inventarEintraege = [];
  }
}
