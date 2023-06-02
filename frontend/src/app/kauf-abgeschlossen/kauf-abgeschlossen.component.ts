import { Component, OnInit } from '@angular/core';

import { InventarService }  from '../inventar.service';


@Component({
  selector: 'app-kauf-abgeschlossen',
  templateUrl: './kauf-abgeschlossen.component.html',
  styleUrls: ['./kauf-abgeschlossen.component.css']
})
export class KaufAbgeschlossenComponent implements OnInit {

  constructor(private inventarService: InventarService) { }

  ngOnInit() {
    this.inventarService.leereInventar();
  }

}
