import { Component, OnInit } from '@angular/core';

import { FehlerService } from '../fehler.service';

@Component({
  selector: 'app-fehler-anzeige',
  templateUrl: './fehler-anzeige.component.html',
  styleUrls: ['./fehler-anzeige.component.css']
})
export class FehlerAnzeigeComponent implements OnInit {

  public fehlermeldungen: String[] = [];


  constructor(private fehlerService: FehlerService) { }

  ngOnInit() {
    this.fehlerService.fehlermeldungenGeben().subscribe(fm => this.fehlermeldungen = fm);
  }

  fehlerNachrichtenLeeren() {
    this.fehlerService.fehlerLeeren();
  }


}
