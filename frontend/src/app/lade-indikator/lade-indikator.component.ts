import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

import { LadeIndikatorService } from '../lade-indikator.service';

@Component({
  selector: 'app-lade-indikator',
  templateUrl: './lade-indikator.component.html',
  styleUrls: ['./lade-indikator.component.css']
})
export class LadeIndikatorComponent implements OnInit {

  public ladestatus: number;
  public fehlermeldungen: String[] = [];

  constructor(private ladeIndikatorService: LadeIndikatorService) { }

  ngOnInit() {
    this.ladeIndikatorService.ladeIndikatorGeben().subscribe(s => this.ladestatus = s, error => console.log(error));
    this.ladeIndikatorService.fehlermeldungenGeben().subscribe(fm => this.fehlermeldungen = fm);
  }

  fehlerNachrichtenLeeren() {
    this.ladeIndikatorService.fehlerLeeren();
  }
}
