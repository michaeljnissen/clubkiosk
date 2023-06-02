import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { Location } from '@angular/common';


import { Produkt }         from '../produkt';
import { ProduktService }  from '../produkt.service';
import { InventarService }  from '../inventar.service';

@Component({
  selector: 'app-produkt-detail',
  templateUrl: './produkt-detail.component.html',
  styleUrls: ['./produkt-detail.component.css']
})
export class ProduktDetailComponent implements OnInit {

  produkt: Produkt;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private produktService: ProduktService,
      private inventarService: InventarService,
      private location: Location
  ) {}

  ngOnInit() {
    this.bezieheProdukt();
  }

  bezieheProdukt(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    let p = new Produkt();
    p.id = id;
    this.produktService.bezieheProdukt(p)
      .subscribe(produkt => this.produkt = produkt);
  }

  warenkorbHinzfuegen(): void {
    this.inventarService.fuegeProduktHinzu(this.produkt, 1);
    this.router.navigate(['warenkorb']);
  }
}
